import { EventHandler } from '@create-figma-plugin/utilities'


export interface CreatePageHandler extends EventHandler {
  name: 'CREATE_PAGES'
  handler: () => void
}

export interface CreateChecklistHandler extends EventHandler {
  name: 'CREATE_CHECKLIST'
  handler: () => void
}

type coverTitle = {
  name: string;
}
