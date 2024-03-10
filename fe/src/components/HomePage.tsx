import { useState } from "react";
export default function HomePage() {
  const [bgImage, setBgImage] = useState(
    "url('https://images.squarespace-cdn.com/content/v1/5755bccb8259b515333df0e1/1466111941034-GIIKB6HB6ADZB2O0D7HW/Stocksy_comp_461838.jpg?format=2500w')"
  );

  const handleImageChange = (imageUrl: string) => {
    setBgImage(`url('${imageUrl}')`);
  };
  return (
    <div
      className="bg-no-repeat bg-cover bg-center "
      style={{ backgroundImage: bgImage }}
    >
      <div className="flex justify-center gap-x-8 md:gap-x-20 lg:gap-x-28 xl:gap-x-36  text-gray-50  font-serif lg:text-7xl md:text-5xl text-4xl items-center h-screen w-screen">
        <div
          className="hover:underline underline-offset-8 decoration-2"
          onMouseEnter={() =>
            handleImageChange(
              "https://images.squarespace-cdn.com/content/v1/5755bccb8259b515333df0e1/1466111941034-GIIKB6HB6ADZB2O0D7HW/Stocksy_comp_461838.jpg?format=2500w"
            )
          }
        >
          EAT
        </div>
        <div
          className="hover:underline underline-offset-8 decoration-2"
          onMouseEnter={() =>
            handleImageChange(
              "https://images.squarespace-cdn.com/content/v1/5755bccb8259b515333df0e1/1466120130465-9BNATBEVMW9VCWH2KMA2/Stocksy_comp_461841-color.jpg?format=2500w"
            )
          }
        >
          DRINK{" "}
        </div>
        <div
          className="hover:underline underline-offset-8 decoration-2"
          onMouseEnter={() =>
            handleImageChange(
              "https://images.squarespace-cdn.com/content/v1/5755bccb8259b515333df0e1/1466120517882-GMTUN8QUTQPXD3SSUKAE/Stocksy_comp_486556.jpg?format=2500w"
            )
          }
        >
          VISIT
        </div>
      </div>
    </div>
  );
}
