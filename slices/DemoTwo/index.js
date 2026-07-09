import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.DemoTwoSlice} DemoTwoSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<DemoTwoSlice>} DemoTwoProps
 * @type {import("react").FC<DemoTwoProps>}
 */
const DemoTwo = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
       className="bg-red-950"
    >
      <div>
        <p>{slice.primary.demo_text}</p>
      </div>
      <PrismicRichText field={slice.primary.demo_textwo} />
    </section>
  );
};

export default DemoTwo;
