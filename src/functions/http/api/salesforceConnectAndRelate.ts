import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";

const SALESFORCE_URL = "https://login.salesforce.com/services/oauth2/token";
const HEARSAY_URL = `https://api.hearsaysocial.com/v1/org`;

const fetchSalesforceToken = async (): Promise<{
  access_token: string;
  instance_url: string;
} | null> => {
  try {
    const formData = new URLSearchParams({
      grant_type: YEXT_PUBLIC_SALESFORCE_GRANT_TYPE as string,
      client_id: YEXT_PUBLIC_SALESFORCE_CLIENT_ID as string,
      client_secret: YEXT_PUBLIC_SALESFORCE_CLIENT_SECRET as string,
      username: YEXT_PUBLIC_SALESFORCE_USERNAME as string,
      password:
        YEXT_PUBLIC_SALESFORCE_PASSWORD + YEXT_PUBLIC_SALESFORCE_SECURITY_TOKEN,
    });

    const response = await fetch(SALESFORCE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok || data.error)
      throw new Error(data.error_description || "Authentication failed");

    return { access_token: data.access_token, instance_url: data.instance_url };
  } catch (error) {
    console.error("Salesforce Authentication Error:", error);
    return null;
  }
};

const salesforceConnectAndRelate = async (
  request: PagesHttpRequest
): Promise<PagesHttpResponse> => {
  try {
    const { body } = request;
    if (!body) {
      return {
        body: JSON.stringify({ error: "No request body provided" }),
        headers: { "Content-Type": "application/json" },
        statusCode: 400,
      };
    }

    const { sf_lead, hearsay_lead, body_relate } = JSON.parse(body);

    const authData = await fetchSalesforceToken();
    if (!authData) {
      return {
        body: JSON.stringify({ error: "Authentication failed" }),
        headers: { "Content-Type": "application/json" },
        statusCode: 401,
      };
    }

    const [sfLeadResponse, hearsayResponse] = await Promise.all([
      fetch(`${authData.instance_url}/services/data/v59.0/sobjects/Lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.access_token}`,
        },
        body: JSON.stringify(sf_lead),
      }),
      fetch(
        `${HEARSAY_URL}/${YEXT_PUBLIC_HEARSAY_ORG_ID as string}/groups/${YEXT_PUBLIC_HEARSAY_GROUP_ID as string}/contacts/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": YEXT_PUBLIC_HEARSAY_XAPIKEY as string,
          },
          body: JSON.stringify(hearsay_lead),
        }
      ),
    ]);

    const sfLeadText = await sfLeadResponse.text();
    const hearsayText = await hearsayResponse.text();

    let sfLeadData, hearsayData;
    try {
      sfLeadData = JSON.parse(sfLeadText);
      hearsayData = JSON.parse(hearsayText);
    } catch (error) {
      console.error("Failed to parse JSON response:", sfLeadText, hearsayText);
      throw new Error("Invalid JSON response from API");
    }

    let textData = null;
    if (hearsayResponse.ok) {
      const textResponse = await fetch(
        `${HEARSAY_URL}/${YEXT_PUBLIC_HEARSAY_ORG_ID as string}/groups/${YEXT_PUBLIC_HEARSAY_GROUP_ID as string}/messages/${YEXT_PUBLIC_HEARSAY_MESSAGES_ID as string}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": YEXT_PUBLIC_HEARSAY_XAPIKEY as string,
          },
          body: JSON.stringify(body_relate),
        }
      );

      const textText = await textResponse.text();
      try {
        textData = JSON.parse(textText);
      } catch (error) {
        console.error("Failed to parse text message response:", textText);
      }
    }

    return {
      body: JSON.stringify({
        message: "Salesforce and Hearsay leads created successfully",
        sfLeadData,
        hearsayData,
        textData,
      }),
      headers: { "Content-Type": "application/json" },
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      body: JSON.stringify({ error: "Internal Server Error" }),
      headers: { "Content-Type": "application/json" },
      statusCode: 500,
    };
  }
};

export default salesforceConnectAndRelate;
