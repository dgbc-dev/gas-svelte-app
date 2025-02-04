import { derived, writable } from "svelte/store";

export const userIsAdmin = writable(false); // Default to false or set based on your needs
export const isLoading = writable<boolean>(false);
