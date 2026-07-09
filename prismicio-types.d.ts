import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

type DemohomeDocumentDataSlicesSlice = DemoTwoSlice | DemoOneSlice | AfterTypeBuilderSlice

/**
 * Content for demoHome documents
 */
interface DemohomeDocumentData {
	/**
	 * Slice Zone field in *demoHome*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: demohome.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<DemohomeDocumentDataSlicesSlice>;/**
	 * Meta Title field in *demoHome*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: demohome.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *demoHome*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: demohome.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *demoHome*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: demohome.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * demoHome document from Prismic
 *
 * - **API ID**: `demohome`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type DemohomeDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<DemohomeDocumentData>, "demohome", Lang>;

type PagesDocumentDataSlicesSlice = DemoTwoSlice | DemoOneSlice

/**
 * Content for pages documents
 */
interface PagesDocumentData {
	/**
	 * Slice Zone field in *pages*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pages.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<PagesDocumentDataSlicesSlice>;/**
	 * Meta Title field in *pages*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: pages.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *pages*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: pages.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *pages*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pages.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * pages document from Prismic
 *
 * - **API ID**: `pages`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PagesDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<PagesDocumentData>, "pages", Lang>;

export type AllDocumentTypes = DemohomeDocument | PagesDocument;

/**
 * Primary content in *AfterTypeBuilder → Default → Primary*
 */
export interface AfterTypeBuilderSliceDefaultPrimary {
	/**
	 * New Image field in *AfterTypeBuilder → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: after_type_builder.default.primary.new_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	new_image: prismic.ImageField<never>;
	
	/**
	 * TypebuilderRichText field in *AfterTypeBuilder → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: after_type_builder.default.primary.typebuilder_rich_text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	typebuilder_rich_text: prismic.RichTextField;
	
	/**
	 * typebuilderText field in *AfterTypeBuilder → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: after_type_builder.default.primary.typebuilder_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	typebuilder_text: prismic.KeyTextField;
	
	/**
	 * short description field in *AfterTypeBuilder → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: after_type_builder.default.primary.short_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	short_description: prismic.RichTextField;
}

/**
 * Default variation for AfterTypeBuilder Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type AfterTypeBuilderSliceDefault = prismic.SharedSliceVariation<"default", Simplify<AfterTypeBuilderSliceDefaultPrimary>, never>;

/**
 * Slice variation for *AfterTypeBuilder*
 */
type AfterTypeBuilderSliceVariation = AfterTypeBuilderSliceDefault

/**
 * AfterTypeBuilder Shared Slice
 *
 * - **API ID**: `after_type_builder`
 * - **Description**: AfterTypeBuilder
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type AfterTypeBuilderSlice = prismic.SharedSlice<"after_type_builder", AfterTypeBuilderSliceVariation>;

/**
 * Item in *DemoOne → Default → Primary → Card*
 */
export interface DemoOneSliceDefaultPrimaryCardItem {
	/**
	 * card image field in *DemoOne → Default → Primary → Card*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: demo_one.default.primary.card[].card_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	card_image: prismic.ImageField<never>;
	
	/**
	 * card text field in *DemoOne → Default → Primary → Card*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: demo_one.default.primary.card[].card_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	card_text: prismic.KeyTextField;
	
	/**
	 * description field in *DemoOne → Default → Primary → Card*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: demo_one.default.primary.card[].description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * short description field in *DemoOne → Default → Primary → Card*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: demo_one.default.primary.card[].short_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	short_description: prismic.RichTextField;
}

/**
 * Primary content in *DemoOne → Default → Primary*
 */
export interface DemoOneSliceDefaultPrimary {
	/**
	 * demo image field in *DemoOne → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: demo_one.default.primary.demo_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	demo_image: prismic.ImageField<never>;
	
	/**
	 * demo text field in *DemoOne → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: demo_one.default.primary.demo_text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	demo_text: prismic.RichTextField;
	
	/**
	 * demo link field in *DemoOne → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: demo_one.default.primary.demo_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	demo_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Card field in *DemoOne → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: demo_one.default.primary.card[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	card: prismic.GroupField<Simplify<DemoOneSliceDefaultPrimaryCardItem>>;
}

/**
 * Default variation for DemoOne Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type DemoOneSliceDefault = prismic.SharedSliceVariation<"default", Simplify<DemoOneSliceDefaultPrimary>, never>;

/**
 * Slice variation for *DemoOne*
 */
type DemoOneSliceVariation = DemoOneSliceDefault

/**
 * DemoOne Shared Slice
 *
 * - **API ID**: `demo_one`
 * - **Description**: DemoOne
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type DemoOneSlice = prismic.SharedSlice<"demo_one", DemoOneSliceVariation>;

/**
 * Primary content in *DemoTwo → Default → Primary*
 */
export interface DemoTwoSliceDefaultPrimary {
	/**
	 * Demo text field in *DemoTwo → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: demo_two.default.primary.demo_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	demo_text: prismic.KeyTextField;
	
	/**
	 * Demo textwo field in *DemoTwo → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: demo_two.default.primary.demo_textwo
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	demo_textwo: prismic.RichTextField;
}

/**
 * Default variation for DemoTwo Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type DemoTwoSliceDefault = prismic.SharedSliceVariation<"default", Simplify<DemoTwoSliceDefaultPrimary>, never>;

/**
 * Slice variation for *DemoTwo*
 */
type DemoTwoSliceVariation = DemoTwoSliceDefault

/**
 * DemoTwo Shared Slice
 *
 * - **API ID**: `demo_two`
 * - **Description**: DemoTwo
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type DemoTwoSlice = prismic.SharedSlice<"demo_two", DemoTwoSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			DemohomeDocument,
			DemohomeDocumentData,
			DemohomeDocumentDataSlicesSlice,
			PagesDocument,
			PagesDocumentData,
			PagesDocumentDataSlicesSlice,
			AllDocumentTypes,
			AfterTypeBuilderSlice,
			AfterTypeBuilderSliceDefaultPrimary,
			AfterTypeBuilderSliceVariation,
			AfterTypeBuilderSliceDefault,
			DemoOneSlice,
			DemoOneSliceDefaultPrimaryCardItem,
			DemoOneSliceDefaultPrimary,
			DemoOneSliceVariation,
			DemoOneSliceDefault,
			DemoTwoSlice,
			DemoTwoSliceDefaultPrimary,
			DemoTwoSliceVariation,
			DemoTwoSliceDefault
		}
	}
}