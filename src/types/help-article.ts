export interface Markdown {
	markdown: string,
}

export interface RichTextV2 {
	json: Record<string, any>,
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

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

export interface C_secondaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export default interface HelpArticle {
	bodyV2?: Markdown,
	externalArticlePostDate?: string,
	externalArticleUpdateDate?: string,
	landingPageUrl?: string,
	nudgeEnabled?: boolean,
	primaryConversationContact?: any,
	promoted?: boolean,
	shortDescriptionV2?: RichTextV2,
	slug?: string,
	voteCount?: number,
	voteSum?: number,
	name: string,
	c_activeOnAnswer?: boolean,
	c_articleCategory?: string,
	c_author?: string,
	c_body_v1?: string,
	c_finprohelparticle?: EntityReference[],
	c_hcprohelparticle?: EntityReference[],
	c_image?: Image,
	c_parentEntityType?: string,
	c_primaryCTA?: C_primaryCTA,
	c_secondaryCTA?: C_secondaryCTA,
	c_shortDescriptionV1?: string,
	keywords?: string[],
	id: string,
	timezone?: any,
}
