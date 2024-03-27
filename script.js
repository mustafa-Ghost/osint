


function dataProccessing(response_data){
    const num_of_results = response_data["NumOfResults"] || 0;
    const list_data = response_data["List"] || {};

    if (Object.keys(list_data).length !== 0) {
        // التحقق من وجود قسم "No results found" داخل القسم "List"
        const no_results = list_data["No results found"] || {};
        if (Object.keys(no_results).length !== 0) {
            const info_leak = no_results["InfoLeak"] || "";
            if (info_leak.includes("At your request, no results were found")) {
                console.log("لم يتم العثور على نتائج.");
            }
        } else {
            // قراءة وطباعة محتويات جميع الأقسام داخل "List" بالشكل المطلوب
            for (const [section_name, section_data] of Object.entries(list_data)) {
                const dataTemplate = {
                    sectionName:section_name,
                    data:section_data.Data
                }
                return dataTemplate
                // if (typeof section_data === "object") {
                //     for (const [key, value] of Object.entries(section_data)) {
                //         if (key === "Data") {
                //             const data_list = value || [];
                //             data_list.forEach(item => {
                //                 if (typeof item === "object") {
                //                     for (const [item_key, item_value] of Object.entries(item)) {
                //                         // console.log(`${item_key}: ${item_value}`);
                //                         return {key:item_key, value:item_value}
                //                     }
                //                 }
                //             });
                //         } else {
                //             return {key, value}
                //             if (key === "InfoLeak") {
                //                 console.log(); // إضافة سطر جديد بعد طباعة المفتاح InfoLeak والقيمة
                //             }
                //         }
                //     }
                // }
            }
        }
    } else {
        // طباعة جميع المفاتيح والقيم كالمعتاد
        for (const [key, value] of Object.entries(response_data)) {
            if (Array.isArray(value)) {
                const formatted_values = value
                // return `${key}: ${formatted_values}`
                return {formatted_values}
            } else {
                return {key, value}
            }
        }
    }

}




async function fetchData(data){
    await fetch("https://server.leakosint.com/", {
        method:"POST",
        body:JSON.stringify(data),
    })
    .then(res => {
        return res.json()
    })
    .then(result => {
        const finalResult = dataProccessing(result)
        console.log(finalResult)
    })
    .catch(err => {
        console.log(err)
    })
}
function mapToObject(map) {
    const obj = {};
    for (let [key, value] of map.entries()) {
        obj[key] = value;
    }
    return obj;
}
var values = new Map()
async function createData(){
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        var name = input.getAttribute('name')
        values.set(name, input.value)
    })
    const data = await mapToObject(values)
    await fetchData(data)
}
// fetchData({"token": "735055104:a7YQFWiL", "request": "mohammed", "limit": 100, "lang": "en"})