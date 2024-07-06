import { Credit, CrewMember, type Media } from "@/types";

export default function formatNames(
  nameList: Credit[] | CrewMember[],
  dataObj: Media,
) {
  // format movie director names
  if (dataObj.mediaType === "movie" && nameList) {
    const data = { ...dataObj };
    if (nameList.length > 2) {
      data.director =
        nameList
          .map((director) => director.name)
          .slice(0, 2)
          .join(", ") + "...";
    } else if (nameList.length === 2) {
      data.director = nameList.map((director) => director.name).join(", ");
    } else if (nameList.length === 1) {
      data.director = nameList[0].name;
    } else {
      data.director = "Unknown";
    }
    return data;
  }

  if (dataObj.mediaType === "tv" && nameList) {
    // format series creator names
    const data = { ...dataObj };
    if (nameList.length > 2) {
      data.creator =
        nameList
          .map((creator) => creator.name)
          .slice(0, 2)
          .join(", ") + "...";
    } else if (nameList.length === 2) {
      data.creator = nameList.map((creator) => creator.name).join(", ");
    } else if (nameList.length === 1) {
      data.creator = nameList[0].name;
    } else {
      data.creator = "Unknown";
    }
    return data;
  }
}
