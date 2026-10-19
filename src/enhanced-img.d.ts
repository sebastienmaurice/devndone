// Imports d'images avec largeurs explicites (@sveltejs/enhanced-img), par ex.
// import hero from '$lib/assets/…/image.png?enhanced&w=1120;720;480';
// Le paquet ne déclare que le suffixe « ?enhanced » seul.
declare module '*?enhanced&w=1120;720;480' {
	const picture: import('vite-imagetools').Picture;
	export default picture;
}
