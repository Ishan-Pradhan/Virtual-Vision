import Feature from "../Feature";

const featureImages = [
  "images/icons/scarf.svg",
  "images/icons/Shipping.svg",
  "images/icons/support.svg",
];

function Features() {
  return (
    <section id="features" className="mt-12 md:my-5 " data-aos="zoom-in">
      <div className="container mx-auto md:px-16 flex flex-col gap-10 md:gap-5 md:flex-row items-center justify-between">
        <Feature
          images={featureImages[0]}
          title={"Product Customization"}
          featureContent={
            "Customize your style with our exclusive options for the products"
          }
        />
        <Feature
          images={featureImages[1]}
          title={"Fast Shipping"}
          featureContent={
            "Swift shipping ensures your chosen pieces arrive promptly, ready to elevate your style."
          }
        />
        <Feature
          images={featureImages[2]}
          title={"24/7 Support"}
          featureContent={
            "Enjoy around-the-clock support, ensuring assistance whenever you need it."
          }
        />
      </div>
    </section>
  );
}

export default Features;
