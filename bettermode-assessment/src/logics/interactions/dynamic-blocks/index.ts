import { InteractionWebhook, InteractionWebhookResponse } from '@interfaces'

import { getInteractionNotSupportedError } from '../../error.logics'

import { globalLogger } from '@utils'
import { DynamicBlock } from './constants'
import { getFavoritePostsInteractionResponse } from './favorite-posts'
import { getSettingsInteractionResponse } from './settings'
import { getWelcomeInteractionResponse } from './welcome/interaction.logics'

const logger = globalLogger.setContext(`DynamicBlock`)

export const getDynamicBlockInteractionResponse = async (
  webhook: InteractionWebhook,
): Promise<InteractionWebhookResponse> => {
  logger.debug('getDynamicBlockResponse called', { webhook })

  const {
    data: { dynamicBlockKey },
  } = webhook

  switch (dynamicBlockKey) {
    case DynamicBlock.Settings:
      return getSettingsInteractionResponse(webhook)
    case DynamicBlock.FavoritePosts:
      return getFavoritePostsInteractionResponse(webhook)
    case DynamicBlock.Welcome:
      return getWelcomeInteractionResponse(webhook)
    default:
      return getInteractionNotSupportedError('dynamicBlockKey', dynamicBlockKey)
  }
}
