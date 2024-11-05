import { Arg, Query, Resolver, Root, Subscription, type SubscriptionHandlerData, } from "type-graphql";
import { Topic, pubSub } from './pubsub'
import { IDevicePayload, Device } from "./device.type";

@Resolver()
export class DeviceResolver {

	@Query(_returns => String)
	test() {
		return "OK";
	}

	// @Subscription({ topics: Topic.NOTIFICATIONS })
	// verifyDevice(@Arg('device') device: Device): Device {
	// 	return { sn: '1234' }
	// }

}