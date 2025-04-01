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

export interface EntityReference {
	entityId: string,
	name: string,
}

export enum BingRelationshipType {
	LOCATED_IN = "Located In",
	DEPARTMENT_OF = "Department Of",
	WORKS_AT = "Works At",
}

export enum CovidVaccinesOffered {
	PFIZER = "Pfizer",
	MODERNA = "Moderna",
	JOHNSON___JOHNSON = "Johnson & Johnson",
}

export interface FrequentlyAskedQuestions {
	question: string,
	answer?: string,
}

export enum Type {
	DEPARTMENT_IN = "Department In",
	INDEPENDENT_ESTABLISHMENT_IN = "Independent Establishment In",
}

export interface GoogleEntityRelationship {
	type: Type,
	placeId: string,
}

export enum Type_1 {
	POSTAL_CODE = "Postal Code",
	REGION = "State/Region",
	COUNTY = "County",
	CITY = "City",
	SUBLOCALITY = "Sublocality",
}

export interface ServiceAreaPlaces {
	name?: string,
	type?: Type_1,
	googlePlaceId?: string,
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

export enum LinkType {
	OTHER = "Other",
	URL = "URL",
	PHONE = "Phone",
	EMAIL = "Email",
}

export interface CTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface C_appointmentPromo {
	sectionTitle?: string,
	sectionDescription?: string,
	cTA?: CTA[],
}

export enum C_appointmentSectionType {
	WHEN = "When",
	ACCESS = "Access",
	TO_ACCESS = "To access",
	NEW = "New",
}

export interface Button1 {
	text?: string,
	ctaAction(url,Phone,Email)?: string,
}

export interface Button2 {
	text?: string,
	ctaAction(url,Phone,Email)?: string,
}

export interface Link1 {
	text?: string,
	link?: string,
}

export interface Link2 {
	text?: string,
	ctaAction(url,Phone,Email)?: string,
}

export interface C_appointmentsAndReferralsProviders {
	Description?: string,
	button1?: Button1,
	button2?: Button2,
	link1?: Link1,
	link2?: Link2,
	additionalText?: string,
}

export interface C_appointmentsAndReferralsSectionFlexible {
	Description?: string,
	button1?: Button1,
	button2?: Button2,
	link1?: Link1,
	link2?: Link2,
	additionalText?: string,
}

export interface C_findExpertsSectionFlexible {
	description?: string,
	button1?: Button1,
	button2?: Button2,
}

export enum C_locationType {
	PRIMARY_CARE = "Primary Care",
	SPECIALTY_CARE = "Specialty Care",
	HOME_HEALTH = "Home Health",
	PHARMACY = "Pharmacy",
	DEPARTMENT = "Medical Center",
	URGENT_CARE = "Urgent Care",
	SURGERY_CENTER = "Surgery Center",
	EMERGENCY_DEPARTMENT = "Emergency Department",
}

export interface MediaTitleURL {
	text?: string,
	link?: string,
}

export interface C_mediaGallery {
	photo?: Image,
	mediaTitleURL?: MediaTitleURL,
	mediaDescription?: string,
}

export interface C_meta {
	title?: string,
	description?: string,
}

export interface NotificationBannerLink {
	text?: string,
	link?: string,
}

export interface C_notificationBannerNew {
	notificationBannerHeader?: string,
	notificationBannerDescription?: string,
	notificationBannerLink?: NotificationBannerLink,
}

export interface C_primaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface Button {
	text?: string,
	ctaAction(url,Phone,Email)?: string,
}

export interface C_promoSectionFlexible {
	photo?: Image,
	heading?: string,
	description?: string,
	button?: Button,
}

export enum C_region {
	SOUHEAST = "Souheast",
	SOUTHWEST = "Southwest",
}

export interface ResourcesList {
	text?: string,
	link?: string,
}

export interface SectionCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface C_resources {
	sectionTitle?: string,
	sectionDescription?: string,
	video?: string,
	listHeading?: string,
	resourcesList?: ResourcesList[],
	sectionCTA?: SectionCTA,
}

export interface C_secondaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface C_secondayCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface C_servicesSectionList {
	text?: string,
	link?: string,
}

export enum Type_2 {
	NONE = "None",
	BOOK_NOW = "Book Now",
	CALL_NOW = "Call Now",
	CONTACT_US = "Contact Us",
	SEND_MESSAGE = "Send Message",
	USE_APP = "Use App",
	PLAY_GAME = "Play Game",
	SHOP_NOW = "Shop Now",
	SIGN_UP = "Sign Up",
	WATCH_VIDEO = "Watch Video",
	SEND_EMAIL = "Send Email",
	LEARN_MORE = "Learn More",
	PURCHASE_GIFT_CARDS = "Purchase Gift Cards",
	ORDER_NOW = "Order Now",
	FOLLOW_PAGE = "Follow Page",
}

export interface FacebookCallToAction {
	type: Type_2,
	value?: string,
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

export interface MenuUrl {
	url?: string,
	displayUrl?: string,
	preferDisplayUrl?: boolean,
}

export interface OrderUrl {
	url?: string,
	displayUrl?: string,
	preferDisplayUrl?: boolean,
}

export enum PaymentOptions {
	AFTERPAY = "Afterpay",
	ALIPAY = "Alipay",
	AMERICANEXPRESS = "American Express",
	ANDROIDPAY = "Google Pay",
	APPLEPAY = "Apple Pay",
	ATM = "ATM",
	ATMQUICK = "ATM Quick",
	BACS = "BACS",
	BANCONTACT = "Bancontact",
	BANKDEPOSIT = "Bank Deposit",
	BANKPAY = "Bank Pay",
	BGO = "Bank/Giro Overschrijving",
	BITCOIN = "Bitcoin",
	Bar = "Bargeld",
	CARTASI = "CartaSi",
	CASH = "Cash",
	CCS = "CCS",
	CHECK = "Check",
	CONB = "Contactloos betalen",
	CONTACTLESSPAYME = "Contactless Payment",
	CVVV = "Cadeaubon/VVV bon",
	DEBITNOTE = "Debit Note",
	DINERSCLUB = "Diners Club",
	DIRECTDEBIT = "Direct Debit",
	DISCOVER = "Discover",
	ECKARTE = "Girokarte",
	ECOCHEQUE = "EcoCheque",
	EKENA = "E-kena",
	EMV = "Elektronische Maaltijdcheques",
	FINANCING = "Financing",
	GOPAY = "GoPay",
	HAYAKAKEN = "Hayakaken",
	HEBAG = "He-Bag",
	IBOD = "iBOD",
	ICCARDS = "IC Cards",
	ICOCA = "Icoca",
	ID = "iD",
	IDEAL = "iDeal",
	INCA = "Incasso",
	INVOICE = "Invoice",
	JCB = "JCB",
	JCoinPay = "J−Coin Pay",
	JKOPAY = "JKO Pay",
	KITACA = "Kitaca",
	KLA = "Klantenkaart",
	KLARNA = "Klarna",
	LINEPAY = "LINE Pay",
	MAESTRO = "Maestro",
	MANACA = "Manaca",
	MASTERCARD = "MasterCard",
	MIPAY = "Mi Pay",
	MONIZZE = "Monizze",
	MPAY = "MPay",
	Manuelle_Lastsch = "Manuelle Lastschrift",
	Merpay = "メルPay",
	NANACO = "nanaco",
	NEXI = "Nexi",
	NIMOCA = "Nimoca",
	OREM = "Onder Rembours",
	PASMO = "Pasmo",
	PAYBACKPAY = "Payback Pay",
	PAYBOX = "Paybox",
	PAYCONIQ = "Payconiq",
	PAYPAL = "PayPal",
	PAYPAY = "PayPay",
	PAYSEC = "PaySec",
	PIN = "PIN",
	POSTEPAY = "Postepay",
	QRCODE = "QR Code Payment",
	QUICPAY = "QUICPay",
	RAKUTENEDY = "Rakuten Edy",
	RAKUTENPAY = "楽天Pay",
	SAMSUNGPAY = "Samsung Pay",
	SODEXO = "Sodexo",
	SUGOCA = "Sugoca",
	SUICA = "Suica",
	SWISH = "Swish",
	TICKETRESTAURANT = "Ticket Restaurant",
	TOICA = "Toica",
	TRAVELERSCHECK = "Traveler's Check",
	TSCUBIC = "TS CUBIC",
	TWINT = "Twint",
	UNIONPAY = "China UnionPay",
	VEV = "Via een verzekering",
	VISA = "Visa",
	VISAELECTRON = "Visa Electron",
	VOB = "Vooruit betalen",
	VOUCHER = "Voucher",
	VPAY = "V PAY",
	WAON = "WAON",
	WECHATPAY = "WeChat Pay",
	WIRETRANSFER = "Wire Transfer",
	Yucho_Pay = "ゆうちょPay",
	ZELLE = "Zelle",
	AuPay = "auPay",
	DBarai = "d払い ",
	Überweisung = "Banküberweisung",
}

export interface RankTrackingCompetitors {
	name: string,
	website: string,
}

export enum RankTrackingFrequency {
	WEEKLY = "Weekly",
	MONTHLY = "Monthly",
	QUARTERLY = "Quarterly",
}

export enum RankTrackingKeywords {
	NAME = "Name",
	PRIMARY_CATEGORY = "Primary Category",
	SECONDARY_CATEGORY = "Secondary Category",
}

export enum RankTrackingQueryTemplates {
	KEYWORD = "Keyword",
	KEYWORD_ZIP = "Keyword Zip",
	KEYWORD_CITY = "Keyword City",
	KEYWORD_IN_CITY = "Keyword in City",
	KEYWORD_NEAR_ME = "Keyword near me",
	KEYWORD_CITY_STATE = "Keyword City State",
}

export enum RankTrackingSites {
	GOOGLE_DESKTOP = "Google Desktop",
	GOOGLE_MOBILE = "Google Mobile",
	BING_DESKTOP = "Bing Desktop",
	BING_MOBILE = "Bing Mobile",
	YAHOO_DESKTOP = "Yahoo Desktop",
	YAHOO_MOBILE = "Yahoo Mobile",
}

export interface ReservationUrl {
	url?: string,
	displayUrl?: string,
	preferDisplayUrl?: boolean,
}

export interface ServiceArea {
	places?: string[],
}

export enum Presentation {
	BUTTON = "Button",
	LINK = "Link",
}

export interface UberLink {
	text?: string,
	presentation: Presentation,
}

export interface UberTripBranding {
	text: string,
	url: string,
	description: string,
}

export interface WebsiteUrl {
	url?: string,
	displayUrl?: string,
	preferDisplayUrl?: boolean,
}

export interface ComplexVideo {
	url: string,
	video?: string,
	description?: string,
}

export default interface HealthcareFacility {
	accessHours?: Hours,
	appleActionLinks?: AppleActionLinks[],
	appleBusinessConnectLinkedAccount?: any,
	appleBusinessDescription?: string,
	appleBusinessId?: string,
	appleBusinessIdDqe?: string,
	appleCompanyId?: string,
	appleCompanyIdDqe?: string,
	appleCoverPhoto?: Image,
	bingParentLocation?: EntityReference,
	bingRelationshipType?: BingRelationshipType,
	bingWebsiteOverride?: string,
	blackOwnedBusiness?: boolean,
	covid19InformationUrl?: string,
	covidMessaging?: string,
	covidTestAppointmentUrl?: string,
	covidTestingAppointmentRequired?: boolean,
	covidTestingDriveThroughSite?: boolean,
	covidTestingIsFree?: boolean,
	covidTestingPatientRestrictions?: boolean,
	covidTestingReferralRequired?: boolean,
	covidTestingSiteInstructions?: string,
	covidVaccineAppointmentRequired?: boolean,
	covidVaccineDriveThroughSite?: boolean,
	covidVaccineInformationUrl?: string,
	covidVaccinePatientRestrictions?: boolean,
	covidVaccineReferralRequired?: boolean,
	covidVaccineSiteInstructions?: string,
	covidVaccinesOffered?: CovidVaccinesOffered[],
	facebookAbout?: string,
	facebookWebsiteOverride?: string,
	frequentlyAskedQuestions?: FrequentlyAskedQuestions[],
	fullyVaccinatedStaff?: boolean,
	geomodifier?: string,
	googleEntityRelationship?: GoogleEntityRelationship,
	googleMyBusinessLabels?: string[],
	googlePlaceId?: string,
	googleShortName?: string,
	holidayHoursConversationEnabled?: boolean,
	impressum?: string,
	landingPageUrl?: string,
	linkedInUrl?: string,
	neighborhood?: string,
	nudgeEnabled?: boolean,
	onlineServiceHours?: Hours,
	phoneticName?: string,
	pickupHours?: Hours,
	pinterestUrl?: string,
	primaryConversationContact?: any,
	reviewResponseConversationEnabled?: boolean,
	serviceAreaPlaces?: ServiceAreaPlaces[],
	slug?: string,
	telehealthUrl?: string,
	tikTokUrl?: string,
	what3WordsAddress?: string,
	yelpWebsiteOverride?: string,
	youTubeChannelUrl?: string,
	acceptingNewPatients?: boolean,
	additionalHoursText?: string,
	address: Address,
	addressHidden?: boolean,
	alternatePhone?: any,
	associations?: string[],
	brands?: string[],
	description?: string,
	hours?: Hours,
	logo?: ComplexImage,
	name: string,
	categories?: any,
	cityCoordinate?: Coordinate,
	closed?: boolean,
	conditionsTreated?: string[],
	c_appointmentPromo?: C_appointmentPromo,
	c_appointmentSectionType?: C_appointmentSectionType,
	c_appointmentURL?: string,
	c_appointmentsAndReferralsProviders?: C_appointmentsAndReferralsProviders,
	c_appointmentsAndReferralsCTAText?: string,
	c_appointmentsAndReferralsSectionFlexible?: C_appointmentsAndReferralsSectionFlexible,
	c_bingURL?: string,
	c_bingUTM?: string,
	c_campusMapPDF?: string,
	dm_directoryParents_fins_locations_directory?: EntityReference[],
	c_extendedNetworkUTM?: string,
	c_facebookURL?: string,
	c_facebookUTM?: string,
	c_facilityTeamURL?: string,
	c_findExpertsSectionFlexible?: C_findExpertsSectionFlexible,
	c_generalWebsite?: string,
	c_googleCID?: string,
	c_googleUTM?: string,
	c_languagesList?: string[],
	c_liveOnPages?: boolean,
	c_locationPhoto?: Image,
	c_locationType: C_locationType,
	c_mediaGallery?: C_mediaGallery[],
	c_meta?: C_meta,
	c_notificationBannerNew?: C_notificationBannerNew,
	c_openMonth?: string,
	c_pagesSpecialty?: string,
	c_pagesURL?: string,
	c_parkingMapPDF?: string,
	c_primaryCTA?: C_primaryCTA,
	c_primaryLocation?: string,
	c_promoSectionFlexible?: C_promoSectionFlexible,
	c_region?: C_region,
	c_relatedHealthcareFacility?: EntityReference[],
	c_resources?: C_resources,
	c_secondaryCTA?: C_secondaryCTA,
	c_secondayCTA?: C_secondayCTA,
	c_servicesSectionList?: C_servicesSectionList[],
	c_specialty?: string,
	c_teamSection?: EntityReference[],
	c_testimonialImage?: Image,
	c_testimonialQuote?: string,
	displayCoordinate?: Coordinate,
	dropoffCoordinate?: Coordinate,
	emails?: string[],
	facebookOverrideCity?: string,
	facebookCoverPhoto?: Image,
	facebookCallToAction?: FacebookCallToAction,
	facebookDescriptor?: string,
	facebookEmail?: string,
	facebookLinkedAccount?: any,
	facebookName?: string,
	facebookPageUrl?: string,
	facebookParentPageId?: string,
	facebookProfilePhoto?: Image,
	facebookStoreId?: string,
	facebookVanityUrl?: string,
	fax?: any,
	featuredMessage?: FeaturedMessage,
	photoGallery?: ComplexImage[],
	geocodedCoordinate?: Coordinate,
	gmbLinkedAccount?: any,
	googleAccountId?: string,
	googleAttributes?: any,
	googleCoverPhoto?: Image,
	googleProfilePhoto?: Image,
	googleWebsiteOverride?: string,
	insuranceAccepted?: string[],
	instagramHandle?: string,
	isoRegionCode?: string,
	keywords?: string[],
	languages?: string[],
	localPhone?: any,
	locationType?: LocationType,
	mainPhone?: any,
	menuUrl?: MenuUrl,
	mobilePhone?: any,
	npi?: string,
	orderUrl?: OrderUrl,
	paymentOptions?: PaymentOptions[],
	phones?: any,
	pickupCoordinate?: Coordinate,
	alternateNames?: string[],
	alternateWebsites?: string[],
	rankTrackingCompetitors?: RankTrackingCompetitors[],
	customKeywords?: string[],
	rankTrackingEnabled?: boolean,
	rankTrackingFrequency?: RankTrackingFrequency,
	rankTrackingKeywords?: RankTrackingKeywords[],
	rankTrackingQueryTemplates?: RankTrackingQueryTemplates[],
	rankTrackingSites?: RankTrackingSites[],
	reservationUrl?: ReservationUrl,
	routableCoordinate?: Coordinate,
	serviceArea?: ServiceArea,
	services?: string[],
	shortName35?: string,
	shortName64?: string,
	id: string,
	timezone?: any,
	tollFreePhone?: any,
	ttyPhone?: any,
	twitterHandle?: string,
	uberClientId?: string,
	uberLink?: UberLink,
	uberTripBranding?: UberTripBranding,
	walkableCoordinate?: Coordinate,
	websiteUrl?: WebsiteUrl,
	yearEstablished?: number,
	yextDisplayCoordinate?: Coordinate,
	yextDropoffCoordinate?: Coordinate,
	yextPickupCoordinate?: Coordinate,
	yextRoutableCoordinate?: Coordinate,
	yextWalkableCoordinate?: Coordinate,
	videos?: ComplexVideo[],
}
