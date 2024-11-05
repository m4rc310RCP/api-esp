import { createPubSub } from "@graphql-yoga/subscription";
import { type IDevicePayload } from "./device.type";

export const enum Topic {
	NOTIFICATIONS = "NOTIFICATIONS",
	DYNAMIC_ID_TOPIC = "DYNAMIC_ID_TOPIC",
	REGISTER_DEVICE = "REGISTER_DEVICE",
}

export const pubSub = createPubSub<
	{
		[Topic.NOTIFICATIONS]: [IDevicePayload];
		[Topic.DYNAMIC_ID_TOPIC]: [String, IDevicePayload];
		[Topic.REGISTER_DEVICE]: [String, IDevicePayload];
	} & Record<string, [IDevicePayload]> // Fallback for dynamic topics
>();