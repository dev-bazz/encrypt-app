export const copyItem = async (data: string) => {
	try {
		await navigator.clipboard.writeText(data);
		console.log("Successfully copied text");
		return true;
	} catch (error) {
		console.log("error: ", error);
		return false;
	}
};
