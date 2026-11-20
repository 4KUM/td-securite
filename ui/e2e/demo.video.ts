// Scénario filmé : le parcours de l'appli de départ, puis la faille que le TD
// demande de fermer (une cliente valide son propre virement).
import { expect, test } from '@playwright/test';

test('demo: the starter app, and its flaw', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Comptes' })).toBeVisible();

  await page.getByRole('link', { name: 'FR76-0001' }).click();
  await expect(page.getByRole('heading', { name: 'FR76-0001' })).toBeVisible();

  await page.getByLabel('IBAN du destinataire').pressSequentially('FR76-4242', { delay: 80 });
  await page.getByLabel('Montant (€)').pressSequentially('250', { delay: 80 });
  await page.getByRole('button', { name: 'Virer' }).click();

  const row = page.getByRole('row', { name: /FR76-4242/ });
  await expect(row).toContainText('En attente');

  // Alice est une simple cliente : elle ne devrait pas pouvoir valider.
  await row.getByRole('button', { name: 'Valider' }).click();
  await expect(row).toContainText('Validé par alice');
  await page.waitForTimeout(2000);

  // La page de connexion est fournie : c'est ce qu'il faudra brancher.
  await page.getByRole('link', { name: 'Se connecter' }).click();
  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
  await page.waitForTimeout(2000);
});
