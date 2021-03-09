function getUTCFromNow() {
	const now = new Date();

	return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
}

module.exports = {
	getUTCFromNow,
};
