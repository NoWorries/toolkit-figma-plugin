import { EventHandler } from '@create-figma-plugin/utilities'


export interface CreatePageHandler extends EventHandler {
  name: 'CREATE_PAGES'
  handler: () => void
}
