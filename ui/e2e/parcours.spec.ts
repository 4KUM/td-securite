// Le parcours de l'appli de départ, de bout en bout : voir les comptes, ouvrir
// un compte, faire un virement, le valider. Comme le front (:4200) appelle l'API
// (:8080), ce test prouve aussi que le CORS est en place.
import { expect, test } from '@playwright/test';

const iban = () => `FR76-E2E-${Date.now()}`;

test('lists the accounts and opens one', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/comptes$/);
  await expect(page.getByRole('heading', { name: 'Comptes' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'FR76-0001' })).toBeVisible();

  await page.getByRole('link', { name: 'FR76-0001' }).click();

  await expect(page.getByRole('heading', { name: 'FR76-0001' })).toBeVisible();
  await expect(page.getByText('Alice Martin · Lyon Part-Dieu')).toBeVisible();
  await expect(page.getByRole('row', { name: /FR76-9001/ })).toContainText('Validé par bruno');
});

test('makes a transfer that waits for validation', async ({ page }) => {
  const destination = iban();
  await page.goto('/comptes/1');

  await page.getByLabel('IBAN du destinataire').fill(destination);
  await page.getByLabel('Montant (€)').fill('12.34');
  await page.getByRole('button', { name: 'Virer' }).click();

  const row = page.getByRole('row', { name: new RegExp(destination) });
  await expect(row).toContainText('En attente');
  await expect(row).toContainText(/12[.,]34/);
});

test('validates a pending transfer', async ({ page }) => {
  const destination = iban();
  await page.goto('/comptes/1');
  await page.getByLabel('IBAN du destinataire').fill(destination);
  await page.getByLabel('Montant (€)').fill('5');
  await page.getByRole('button', { name: 'Virer' }).click();
  const row = page.getByRole('row', { name: new RegExp(destination) });
  await expect(row).toContainText('En attente');

  await row.getByRole('button', { name: 'Valider' }).click();

  await expect(row).toContainText('Validé par');
  await expect(row.getByRole('button', { name: 'Valider' })).toHaveCount(0);
});

test('shows an error for an unknown account', async ({ page }) => {
  // Le message d'erreur est le même quelle que soit la cause : on exige donc
  // un vrai 404 de l'API, pas un échec réseau ou CORS.
  const reponse = page.waitForResponse((r) => r.url().endsWith('/api/comptes/999'));
  await page.goto('/comptes/999');

  expect((await reponse).status()).toBe(404);
  await expect(page.getByRole('alert')).toHaveText('Impossible de charger ce compte.');
});
