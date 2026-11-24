// Shared helpers for the host and listener pages.
// Development token server: fine for testing, NOT for a public launch.
const SD = {
  tokenServerId: 'speakeasy-2j2qq5',
  async connect(code, name, audioDefaults) {
    const L = LivekitClient;
    const source = L.TokenSource.developmentTokenServer(SD.tokenServerId);
    const { serverUrl, participantToken } = await source.fetch({
      roomName: 'sd-' + code,
      participantName: name,
    });
    const room = new L.Room({
      audioCaptureDefaults: audioDefaults || {},
    });
    await room.connect(serverUrl, participantToken);
    return room;
  },
  async keepAwake() {
    try { if (navigator.wakeLock) SD.lock = await navigator.wakeLock.request('screen'); } catch (e) {}
  },
};
// Re-acquire the screen lock when the page becomes visible again.
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && SD.lock) SD.keepAwake();
});
