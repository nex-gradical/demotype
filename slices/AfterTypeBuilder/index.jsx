import { PrismicRichText, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.AfterTypeBuilderSlice} AfterTypeBuilderSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<AfterTypeBuilderSlice>} AfterTypeBuilderProps
 * @type {import("react").FC<AfterTypeBuilderProps>}
 */
const AfterTypeBuilder = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mx-auto max-w-3xl px-6 py-16 sm:py-24"
    >
      <div className="flex flex-col items-center gap-8 text-center">
        {slice.primary.new_image?.url && (
          <PrismicNextImage
            field={slice.primary.new_image}
            className="w-full max-w-md rounded-2xl object-cover shadow-lg"
          />
        )}
        <div className="prose prose-neutral max-w-none text-neutral-600">
          <PrismicRichText field={slice.primary.typebuilder_rich_text} />
        </div>

        {slice.primary.typebuilder_text && (
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            {slice.primary.typebuilder_text}
          </h2>
        )}

      </div>
    </section>
  );
};

export default AfterTypeBuilder;
