import './style.css'

import { getOnetime, initRecharge, loginWithShopifyStorefront, updateOnetime } from '@rechargeapps/storefront-client'

initRecharge({
  storeIdentifier: import.meta.env.VITE_SHOPIFY_URL,
  storefrontAccessToken: import.meta.env.VITE_RECHARGE_STOREFRONT_TOKEN
})

let session, onetime

const $btn = document.querySelector('button')
const $pre = document.querySelector('pre')

$btn.addEventListener('click', async () => {
  $btn.disabled = true
  if (!session) {
    session = await loginWithShopifyStorefront(import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN, import.meta.env.VITE_SHOPIFY_CUSTOMER_TOKEN)
    if (session) {
      $pre.innerHTML = JSON.stringify(session, null, 2)
      $btn.innerText = 'Load Onetime'
    }
  } else if (!onetime) {
    onetime = await getOnetime(session, import.meta.env.VITE_ONETIME_ID)
    $pre.innerHTML = JSON.stringify(onetime, null, 2)
    $btn.innerText = 'Update Onetime'
  } else {
    onetime = await updateOnetime(session, import.meta.env.VITE_ONETIME_ID, { quantity: onetime.quantity + 1 })
    $pre.innerHTML = JSON.stringify(onetime, null, 2)
  }
  $btn.disabled = false
})
