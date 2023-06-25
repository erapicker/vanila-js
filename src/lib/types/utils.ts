export type PartialDeep<K> = {
	[attr in keyof K]?: K[attr] extends object ? PartialDeep<K[attr]> : K[attr];
};
