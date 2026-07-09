import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.DemoOneSlice} DemoOneSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<DemoOneSlice>} DemoOneProps
 * @type {import("react").FC<DemoOneProps>}
 */
const DemoOne = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-purple-300"
    >
      <div>
        <PrismicNextImage field={slice.primary.demo_image} />
        <div>
          <PrismicRichText field={slice.primary.demo_text} />
        </div>
        <PrismicNextLink field={slice.primary.demo_link} />
      </div>

      {slice.primary.card?.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {slice.primary.card.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl bg-white shadow-md"
            >
              {item.card_image?.url && (
                <PrismicNextImage
                  field={item.card_image}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-4">{item.card_text}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DemoOne;
