const axios = require("axios");

module.exports = {
  listPopularRaclettes: async (size = 10, full = false) => {
    const result = await axios.get(
      "https://fr.openfoodfacts.org/cgi/search.pl?" +
        "action=process" +
        // Of category raclette
        "&tagtype_0=categories&tag_contains_0=contains&tag_0=raclette" +
        // with a front photo
        "&tagtype_1=states&tag_contains_1=contains&tag_1=en:front-photo-selected" +
        //with a product name
        "&tagtype_2=states&tag_contains_2=contains&tag_2=en:product-name-completed" +
        "&sort_by=popularity" +
        "&page_size=" +
        size +
        "&json=true" +
        (full
          ? ""
          : "&fields=_id,image_small_url,url,ingredients_text_with_allergens_fr,code,product_name,brands,stores")
    );
    return result.data.products;
  },
};
