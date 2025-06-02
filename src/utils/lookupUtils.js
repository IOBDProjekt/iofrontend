export function makeLookupMap(items = [], idKey = 'id', labelKey = 'name') {
    return items.reduce((map, item) => {
        if (item[idKey] != null) {
            map[String(item[idKey])] = item[labelKey];
        }
        return map;
    }, {});
}
