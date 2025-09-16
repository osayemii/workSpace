
function SubPro({name}) {
    const student = [
        {image: "", name: "Fancy Product", price: "$40.00-$80.00"},
        {image: "", name: "Special Item", price: "$18.00"},
        {image: "", name: "Sale Item", price: "$25.00"},
        {image: "", name: "Popular Item", price: "$"},
        {image: "", name: "", price: ""},
        {image: "", name: "", price: ""},
        {image: "", name: "", price: ""},
        {image: "", name: "", price: ""},
    ];
    
    return(
        <>
            {student.map(stud => (
                <>
                    <h3>{stud.name}</h3>
                </>
            ))}
            <h1>{student[0].name}</h1>
        </>
    );
}
export default SubPro