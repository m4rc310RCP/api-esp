import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Device {
	@Field(_type => ID)
	sn!: String;
}

export interface IDevicePayload {
	sn: String;
	message?: string;
}