import { InteractionType, ToastStatus, WebhookStatus, WebhookType } from '@enums'
import { InteractionWebhook, InteractionWebhookResponse } from '@interfaces'

import { RawSlateDto } from '@tribeplatform/slate-kit/dtos'
import { rawSlateToDto } from '@tribeplatform/slate-kit/utils'
import { globalLogger } from '@utils'
import { MESSAGE_TO_SHOW } from './constants'

const logger = globalLogger.setContext(`FavoritePostsDynamicBlock`)

export const getWelcomeInteractionResponse = async (
  webhook: InteractionWebhook,
): Promise<InteractionWebhookResponse> => {
  logger.debug('welcomeInteractionResponse called', { webhook })

  const {
    data: { actorId, interactionId, callbackId },
  } = webhook
  const EMPTY_FAVORITE_POSTS_SLATE: RawSlateDto = {
    rootBlock: 'root',
    blocks: [
      {
        id: 'root',
        name: 'Text',
        props: { value: '', size: 'lg' },
      },
    ],
  }
  return {
    type: WebhookType.Interaction,
    status: WebhookStatus.Succeeded,
    data: {
      interactions: [
        {
          id: interactionId,
          type: InteractionType.OpenToast,
          props: {
            status: ToastStatus.Success,
            title: "Welcome",
            description: MESSAGE_TO_SHOW,
          },
        },
        {
          id: interactionId,
          type: InteractionType.Show,
          slate: rawSlateToDto(EMPTY_FAVORITE_POSTS_SLATE)
        },
      ],
    },
  }
}
