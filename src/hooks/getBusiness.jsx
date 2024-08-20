// // Fetch all businesses from the JSON file
// const getBusiness = async () => {
//     const response = await fetch("/product.json"); // Ensure this path is correct
//     if (!response.ok) throw new Error("Network response was not ok");
//     return response.json();
// };


// // Fetch a specific business by name from the JSON data
// const getBusinessByName = async (businessName) => {
//     const response = await fetch("/product.json"); // Ensure this path is correct
//     if (!response.ok) throw new Error("Network response was not ok");
//     const data = await response.json();
//     const business = data.find(b => b.business_name.toLowerCase() === businessName.toLowerCase());
//     if (!business) throw new Error("Business not found");
//     return business;
// };

// export { getBusiness, getBusinessByName };


// export const fetchBusinesses = async (filters) => {
//     const queryString = new URLSearchParams(filters).toString();
//     const response = await fetch(`/product.json?${queryString}`);
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json(); // Ensure this matches what your component expects
// };


const getBusiness = async () => {
    const res = await fetch("product.json");
    const data = await res.json();
    // console.log(`${process.env.LOCAL_BASE_URL}`);
    // console.log(data?.result);
    return data;
};

export default getBusiness;
