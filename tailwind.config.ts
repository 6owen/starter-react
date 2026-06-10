import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons'

export default {
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['carbon', 'solar']),
    }),
  ],
}
