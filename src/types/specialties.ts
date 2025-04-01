export enum LinkType {
	OTHER = "Other",
	URL = "URL",
	PHONE = "Phone",
	EMAIL = "Email",
}

export interface C_primaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export interface C_secondayCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export default interface Ce_specialty {
	landingPageUrl?: string,
	description?: string,
	name: string,
	c_activeOnAnswers?: boolean,
	c_primaryCTA?: C_primaryCTA,
	c_relatedHealthcareFacility?: EntityReference[],
	c_secondayCTA?: C_secondayCTA,
	keywords?: string[],
	id: string,
}
