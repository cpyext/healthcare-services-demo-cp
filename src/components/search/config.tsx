import {
  CloudRegion,
  Environment,
  SearchConfig,
} from "@yext/search-headless-react";
import {
  ChatConfig,
  Region,
  Environment as ChatEnv,
} from "@yext/chat-headless-react";
import { GlobalConfig } from "../../config/VerticalConfig";

export const searchConfig: SearchConfig = {
  apiKey: import.meta.env.YEXT_PUBLIC_SEARCH_API_KEY,
  experienceKey: import.meta.env.YEXT_PUBLIC_SEARCH_EXP_KEY,
  locale: GlobalConfig.locale,
  experienceVersion: GlobalConfig.searchExperienceVersion
    .toUpperCase()
    .toString(),
  cloudRegion: GlobalConfig.region === "US" ? CloudRegion.US : CloudRegion.EU,
  environment:
    GlobalConfig.accountEnv === "Production"
      ? Environment.PROD
      : Environment.SANDBOX,
};
export const chatConfig: ChatConfig = {
  apiKey: import.meta.env.YEXT_PUBLIC_CHAT_APIKEY,
  botId: import.meta.env.YEXT_PUBLIC_CHAT_BOTID,
  region: GlobalConfig.region === "US" ? Region.US : Region.EU,
  version: GlobalConfig.chatExperienceVersion.toUpperCase().toString(),
  env:
    GlobalConfig.accountEnv === "Production"
      ? ChatEnv.PRODUCTION
      : ChatEnv.SANDBOX,
};
