export interface Interval {
	start: any,
	end: any,
}

export interface DayHour {
	openIntervals?: Interval[],
	isClosed?: boolean,
}

export interface HolidayHours {
	date: string,
	openIntervals?: Interval[],
	isClosed?: boolean,
	isRegularHours?: boolean,
}

export interface Hours {
	monday?: DayHour,
	tuesday?: DayHour,
	wednesday?: DayHour,
	thursday?: DayHour,
	friday?: DayHour,
	saturday?: DayHour,
	sunday?: DayHour,
	holidayHours?: HolidayHours[],
	reopenDate?: string,
}

export enum Category {
	BOOK_TRAVEL = "Book Travel",
	CHECK_IN = "Check in",
	FEES_POLICIES = "Fees Policies - Deprecated",
	FLIGHT_STATUS = "Flight Status",
	TICKETS = "Tickets",
	TICKETING = "Ticketing - Deprecated",
	AMENITIES = "Amenities",
	FRONT_DESK = "Front Desk - Deprecated",
	PARKING = "Parking",
	GIFT_CARD = "Gift Card",
	WAITLIST = "Waitlist",
	DELIVERY = "Delivery (Restaurant)",
	ORDER = "Order (Restaurant)",
	TAKEOUT = "Takeout - Deprecated",
	PICKUP = "Pickup (Restaurant)",
	RESERVE = "Reserve (Restaurant)",
	MENU = "Menu",
	APPOINTMENT = "Appointment - Deprecated",
	PORTFOLIO = "Portfolio - Deprecated",
	QUOTE = "Quote",
	SERVICES = "Services",
	STORE_ORDERS = "Store Orders - Deprecated",
	STORE_SHOP = "Store Shop - Deprecated",
	STORE_SUPPORT = "Store Support - Deprecated",
	SCHEDULE = "Schedule",
	SHOWTIMES = "Showtimes",
	AVAILABILITY = "Availability",
	PRICING = "Pricing",
	ACTIVITIES = "Activities",
	BOOK = "Book",
	BOOK__HOTEL_ = "Book (Hotel)",
	BOOK__RIDE_ = "Book Ride",
	BOOK__TOUR_ = "Book Tour",
	CAREERS = "Careers",
	CHARGE = "Charge",
	COUPONS = "Coupons",
	DELIVERY__RETAIL_ = "Delivery (Retail)",
	DONATE = "Donate",
	EVENTS = "Events",
	ORDER__RETAIL_ = "Order (Retail)",
	OTHER_MENU = "Other Menu - Deprecated",
	PICKUP__RETAIL_ = "Pickup (Retail)",
	RESERVE__PARKING_ = "Reserve (Parking)",
	SHOWS = "Shows",
	SPORTS = "Sports",
	SUPPORT = "Support",
	TEE_TIME = "Tee Time",
	GIFT_CARD__RESTAURANT_ = "Gift Card (Restaurant) - Deprecated",
}

export interface AppleActionLinks {
	category: Category,
	appStoreUrl: string,
	quickLinkUrl: string,
	appName: string,
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

export enum BingAdProfession {
	INSURANCE_SERVICE = "Insurance Service",
	DOCTOR___CLINIC = "Doctor & Clinic",
	REAL_ESTATE_SERVICE = "Real Estate Service",
	TAX_SERVICE = "Tax Service",
	HOME_SERVICE = "Home Service",
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export enum BingRelationshipType {
	LOCATED_IN = "Located In",
	DEPARTMENT_OF = "Department Of",
	WORKS_AT = "Works At",
}

export interface VisualConfigurations {
	pageSet: string,
	data: string,
	siteId: string,
}

export interface Address {
	line1?: string,
	line2?: string,
	line3?: string,
	sublocality?: string,
	city?: string,
	region?: string,
	postalCode?: string,
	extraDescription?: string,
	countryCode?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export interface Coordinate {
	latitude?: number,
	longitude?: number,
}

export interface FeaturedMessage {
	description?: string,
	url?: string,
}

export enum LocationType {
	LOCATION = "Location",
	HEALTHCARE_FACILITY = "Healthcare Facility",
	HEALTHCARE_PROFESSIONAL = "Healthcare Professional",
	ATM = "ATM",
	RESTAURANT = "Restaurant",
	HOTEL = "Hotel",
}

export interface WebsiteUrl {
	url?: string,
	displayUrl?: string,
	preferDisplayUrl?: boolean,
}

export default interface Atm {
	accessHours?: Hours,
	appleActionLinks?: AppleActionLinks[],
	appleBusinessDescription?: string,
	appleBusinessId?: string,
	appleBusinessIdDqe?: string,
	appleCompanyId?: string,
	appleCompanyIdDqe?: string,
	appleCoverPhoto?: Image,
	bingAdAccountNumber?: string,
	bingAdCampaign?: string,
	bingAdGroup?: string,
	bingAdProfession?: BingAdProfession,
	bingParentLocation?: EntityReference,
	bingRelationshipType?: BingRelationshipType,
	bingWebsiteOverride?: string,
	driveThroughHours?: Hours,
	facebookWebsiteOverride?: string,
	geomodifier?: string,
	googleAdministratorEmail?: string,
	holidayHoursConversationEnabled?: boolean,
	landingPageUrl?: string,
	neighborhood?: string,
	nudgeEnabled?: boolean,
	pageLayouts?: EntityReference[],
	phoneticName?: string,
	primaryConversationContact?: any,
	reviewResponseConversationEnabled?: boolean,
	slug?: string,
	visualConfigurations?: VisualConfigurations[],
	what3WordsAddress?: string,
	yelpWebsiteOverride?: string,
	additionalHoursText?: string,
	address: Address,
	alternatePhone?: any,
	description?: string,
	hours?: Hours,
	logo?: ComplexImage,
	name: string,
	categories?: any,
	cityCoordinate?: Coordinate,
	closed?: boolean,
	c_finproatm?: EntityReference[],
	displayCoordinate?: Coordinate,
	dropoffCoordinate?: Coordinate,
	facebookPageUrl?: string,
	fax?: any,
	featuredMessage?: FeaturedMessage,
	photoGallery?: ComplexImage[],
	geocodedCoordinate?: Coordinate,
	googleWebsiteOverride?: string,
	isoRegionCode?: string,
	keywords?: string[],
	localPhone?: any,
	locatedIn?: EntityReference,
	locationType?: LocationType,
	mainPhone?: any,
	mobilePhone?: any,
	phones?: any,
	pickupCoordinate?: Coordinate,
	routableCoordinate?: Coordinate,
	id: string,
	timezone?: any,
	tollFreePhone?: any,
	ttyPhone?: any,
	walkableCoordinate?: Coordinate,
	websiteUrl?: WebsiteUrl,
	yextDisplayCoordinate?: Coordinate,
	yextDropoffCoordinate?: Coordinate,
	yextPickupCoordinate?: Coordinate,
	yextRoutableCoordinate?: Coordinate,
	yextWalkableCoordinate?: Coordinate,
}
