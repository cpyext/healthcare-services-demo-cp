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

export interface CTA1 {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface CTA2 {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface C_aboutSection {
	sectionTitle?: string,
	testimonialQuote?: string,
	videoYoutube?: string,
	videoVimeo?: string,
	biographyParagraph?: string,
	cTA1?: CTA1,
	cTA2?: CTA2,
}

export interface C_aboutSectionResearchList {
	researchTitle?: string,
	researchDescription?: string,
	cTA1?: CTA1,
	cTA2?: CTA2,
}

export enum C_acceptingNewPatientAnswersFilter {
	AGES_0_3 = "Ages 0-3",
	OF_ALL_AGES = "Of All Ages",
}

export enum C_answersCTAText {
	REQUEST_AN_APPOINTMENT = "Request an Appointment",
	REQUEST_A_CONSULTATION = "Request a Consultation",
}

export interface CTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface C_appointmentPromoCFTProvider {
	sectionTitle?: string,
	sectionDescription?: string,
	cTA?: CTA[],
}

export enum C_cTACode {
	PC = "PC",
	SC = "SC",
	UC = "UC",
	NB = "NB",
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

export interface ServicesList {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface C_physicianServicesSection {
	sectionTitle?: string,
	sectionDescription?: string,
	servicesList?: ServicesList[],
}

export interface C_primaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export enum C_schemaSpecialty {
	PEDIATRIC = "Pediatric",
	ANESTHESIA = "Anesthesia",
	CARDIOVASCULAR = "Cardiovascular",
	PSYCHIATRIC = "Psychiatric",
	NEUROLOGIC = "Neurologic",
	PLASTICSURGERY = "PlasticSurgery",
	DERMATOLOGY = "Dermatology",
	EMERGENCY = "Emergency",
	ENDOCRINE = "Endocrine",
	OTOLARYNGOLOGIC = "Otolaryngologic",
	GASTROENTEROLOGIC = "Gastroenterologic",
	GENETIC = "Genetic",
	GYNECOLOGIC = "Gynecologic",
	ONCOLOGIC = "Oncologic",
	HEMATOLOGIC = "Hematologic",
	OBSETRIC = "Obstetric",
	INFECTIOUS = "Infectious",
	RENAL = "Renal",
	SURGICAL = "Surgical",
	MUSCULOSKELETAL = "Musculoskeletal",
	PATHOLOGY = "Pathology",
	PRIMARYCARE = "PrimaryCare",
	PULMONARY = "Pulmonary",
	RADIOGRAPHY = "Radiography",
	RHEUMATOLOGIC = "Rheumatologic",
	RESPIRATORYTHERAPY = "RespiratoryTherapy",
	UROLOGIC = "Urologic",
}

export interface C_secondaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export enum Type_2 {
	FELLOWSHIP = "Fellowship",
	RESIDENCY = "Residency",
	INTERNSHIP = "Internship",
	MEDICAL_SCHOOL = "Medical School",
}

export interface EducationList {
	type: Type_2,
	institutionName: string,
	yearCompleted: number,
}

export enum Type_3 {
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
	type: Type_3,
	value?: string,
}

export interface FeaturedMessage {
	description?: string,
	url?: string,
}

export enum Gender {
	UNSPECIFIED = "Unspecified",
	FEMALE = "Female",
	MALE = "Male",
	NONBINARY = "Nonbinary",
	TRANSGENDER_FEMALE = "Transgender Female",
	TRANSGENDER_MALE = "Transgender Male",
	OTHER = "Other",
	PREFER_NOT_TO_DISCLOSE = "Prefer Not to Disclose",
}

export enum Degrees {
	ANP = "Adult Nurse Practitioner (ANP)",
	APN = "Advanced Practice Nurse (APN)",
	APRN = "Advanced Practice Registered Nurse (APRN)",
	ARNP = "Advanced Registered Nurse Practitioner (ARNP)",
	AUD = "Audiologist (AUD)",
	BSW = "Bachelors of Social Work (BSW)",
	CCCA = "Certificate of Clinical Competence in Audiology (CCCA)",
	CNM = "Certified Nurse Midwife (CNM)",
	CNP = "Certified Nurse Practitioner (CNP)",
	CNS = "Clinical Nurse Specialist (CNS)",
	CPNP = "Certified Pediatric Nurse Practitioner (CPNP)",
	CRNA = "Certified Registered Nurse Anesthetist (CRNA)",
	CRNP = "Certified Registered Nurse Practitioner (CRNP)",
	DC = "Doctor of Chiropractic (DC)",
	DDS = "Doctor of Dental Surgery (DDS)",
	DMD = "Doctor of Dental Medicine (DMD)",
	DNP = "Doctor of Nursing Practice (DNP)",
	DO = "Doctor of Osteopathy (DO)",
	DPM = "Doctor of Podiatric Medicine (DPM)",
	DPT = "Doctor of Physical Therapy (DPT)",
	DSW = "Doctorate Social Work (DSW)",
	DVM = "Doctor of Veterinary Medicine (DVM)",
	FNP = "Family Nurse Practitioner (FNP)",
	GNP = "Geriatric Nurse Practitioner (GNP)",
	LAC = "Licensed Acupuncturist (LAC)",
	LCSW = "Licensed Social Worker (LCSW)",
	LPN = "Licensed Practical Nurse (LPN)",
	MBA = "Master of Business Administration (MBA)",
	MBBS = "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
	MD = "Medical Doctor (MD)",
	MPAS = "Master of Physician Assistant Studies (MPAS)",
	MPH = "Master of Public Health (MPH)",
	MSW = "Master Social Work (MSW)",
	ND = "Naturopathic Doctor (ND)",
	NNP = "Neonatal Nurse Practitioner (NNP)",
	NP = "Nurse Practitioner (NP)",
	OD = "Doctor of Optometry (OD)",
	PA = "Physician Assistant (PA)",
	PAC = "Physician Assistant Certified (PAC)",
	PHARMD = "Doctor of Pharmacy (PHARMD)",
	PHD = "Doctor of Philosophy (PHD)",
	PNP = "Pediatric Nurse Practitioner (PNP)",
	PSYD = "Doctor of Psychology (PSYD)",
	RD = "Registered Dietician (RD)",
	RSW = "Registered Social Worker (RSW)",
	VMD = "Veterinary Medical Doctor (VMD)",
	WHNP = "Womens Health Nurse Practitioner (WHNP)",
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

export default interface HealthcareProfessional {
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
	covid19InformationUrl?: string,
	covidMessaging?: string,
	facebookAbout?: string,
	facebookWebsiteOverride?: string,
	frequentlyAskedQuestions?: FrequentlyAskedQuestions[],
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
	certifications?: string[],
	cityCoordinate?: Coordinate,
	closed?: boolean,
	clusterIndex?: number,
	conditionsTreated?: string[],
	c_aboutSection?: C_aboutSection,
	c_aboutSectionPublicationList?: string[],
	c_aboutSectionResearchList?: C_aboutSectionResearchList[],
	c_aboutSectionResearchTitle?: string,
	c_acceptingNewPatientAnswersFilter?: C_acceptingNewPatientAnswersFilter[],
	c_acceptingPatientsAges03?: boolean,
	c_affiliationsPages?: string,
	c_allPracticeLocationsLink?: EntityReference[],
	c_answersCTAText?: C_answersCTAText,
	c_appointmentCTAText?: string,
	c_appointmentPromoCFTProvider?: C_appointmentPromoCFTProvider,
	c_bingURL?: string,
	c_bingUTM?: string,
	c_bookApptWidgetShowOnPage?: boolean,
	c_cTACode?: C_cTACode,
	dm_directoryParents_fins_locations_directory?: EntityReference[],
	c_educationPages?: string,
	c_epicID?: string,
	c_extendedNetworkUTM?: string,
	c_facebookURL?: string,
	c_facebookUTM?: string,
	c_fellowshipPages?: string,
	c_generalWebsite?: string,
	c_googleUTM?: string,
	c_linkedInURL?: string,
	c_locationPageURL?: string,
	c_mediaGallery?: C_mediaGallery[],
	c_meta?: C_meta,
	c_metadescription?: string,
	c_metatitle?: string,
	c_notificationBannerNew?: C_notificationBannerNew,
	c_offeringVirtualVisits?: boolean,
	c_pageExists?: boolean,
	c_pagesProviderName?: string,
	c_pagesSpecialty?: string,
	c_pagesURL?: string,
	c_physicianDeptID?: string,
	c_physicianPID?: string,
	c_physicianServicesSection?: C_physicianServicesSection,
	c_physicianTitle?: string,
	c_primaryCTA?: C_primaryCTA,
	c_primaryLocation?: string,
	c_primaryLocationLink?: EntityReference[],
	c_proceduresPerformed?: string[],
	c_recognitionListPages?: string[],
	c_residencyPages?: string,
	c_schemaSpecialty?: C_schemaSpecialty,
	c_secondaryCTA?: C_secondaryCTA,
	c_specialty?: string,
	c_youtubeURL?: string,
	displayCoordinate?: Coordinate,
	dropoffCoordinate?: Coordinate,
	educationList?: EducationList[],
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
	firstName?: string,
	photoGallery?: ComplexImage[],
	gender?: Gender,
	geocodedCoordinate?: Coordinate,
	gmbLinkedAccount?: any,
	googleAccountId?: string,
	googleAttributes?: any,
	googleCoverPhoto?: Image,
	googleProfilePhoto?: Image,
	googleWebsiteOverride?: string,
	headshot?: Image,
	admittingHospitals?: string[],
	degrees?: Degrees[],
	insuranceAccepted?: string[],
	instagramHandle?: string,
	isClusterPrimary?: boolean,
	isoRegionCode?: string,
	keywords?: string[],
	languages?: string[],
	lastName?: string,
	localPhone?: any,
	locationType?: LocationType,
	mainPhone?: any,
	menuUrl?: MenuUrl,
	middleName?: string,
	mobilePhone?: any,
	npi?: string,
	officeName?: string,
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
