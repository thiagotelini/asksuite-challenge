import Container from 'typedi'
import { IBrowserServiceToken } from '#business/services/iBrowserService'
import { BrowserService } from '#framework/services/BrowserService'

export const initializeDependencies = () => {
  Container.set(IBrowserServiceToken, new BrowserService())
}
