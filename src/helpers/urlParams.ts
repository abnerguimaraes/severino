export function complementUrl(urlParam): string {
  let urlParams = "";

  // format where = [field, operator, value]
  for (const key of Object.keys(urlParam)) {
    if (key === "where") {
      let values = urlParam[key].split(",");

      switch (values[1]) {
        case "eq":
          urlParams = `where ${values[0]} = ${values[2]}`;
          break;
        case "in":
          urlParams = `where ${values[0]} in (${values[2]})`;
          break;
        case "ne":
          urlParams = `where ${values[0]} <> ${values[2]}`;
          break;
        default:
          urlParams = "";
      }
    } else {
      urlParams = `where ${key} = ${urlParam[key]}`;
    }
  }

  return urlParams;
}

export function newQueryForQueryParam(
  oldQuery: string,
  urlParams: any
): string {
  let newQuery = oldQuery;

  // value on query will be somethink like ${:field}
  for (const key of Object.keys(urlParams)) {
    //check for numeric
    if (!isNaN(urlParams[key])) {
      newQuery = newQuery.replace("${:" + `${key}` + "}", urlParams[key]);
    } else {
      newQuery = newQuery.replace(
        "${:" + `${key}` + "}",
        `'${urlParams[key]}'`
      );
    }
  }

  return newQuery;
}

export function newQueryForQueryBuilder(
  oldQuery: string,
  urlParam: any
): string {
  let newQuery = oldQuery;

  console.log(oldQuery);
  console.log(urlParam);

  // format where = [field, operator, value]
  for (const key of Object.keys(urlParam)) {
    if (key === "where") {
      let values = urlParam[key].split(",");

      switch (values[1]) {
        case "eq":
          newQuery = `${oldQuery} where ${values[0]} = ${values[2]}`;
          break;
        case "in":
          newQuery = `${oldQuery} where ${values[0]} in (${values[2]})`;
          break;
        case "ne":
          newQuery = `${oldQuery} where ${values[0]} <> ${values[2]}`;
          break;
        default:
          newQuery = oldQuery;
      }
    }
  }

  return newQuery;
}
