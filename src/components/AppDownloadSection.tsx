import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { 
  Smartphone, 
  QrCode, 
  Sparkles, 
  Check, 
  Bell, 
  X, 
  Download, 
  Share2, 
  Monitor, 
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const AppDownloadSection: React.FC = () => {
  const { isAppModalOpen, setIsAppModalOpen, showToast, language, t } = useStore();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [installSuccess, setInstallSuccess] = useState(false);

  const handleCopyPromo = () => {
    navigator.clipboard?.writeText('APP10');
    showToast(language === 'es' ? '✓ Código "APP10" copiado al portapapeles' : '✓ Code "APP10" copied to clipboard');
  };

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setInstallSuccess(true);
        showToast(language === 'es' ? '✓ ¡Aplicación instalada con éxito!' : '✓ App installed successfully!');
        return;
      }
    }
    // If not directly triggerable by browser (e.g., in iframe or iOS), open the modal guide
    setIsAppModalOpen(true);
  };

  const handleDownloadLauncherFile = () => {
    // Generate a standalone HTML launcher file that redirects to the app
    const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://kebabturkipollito.com';
    const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kebab Turki-Pollito - App Oficial</title>
  <meta http-equiv="refresh" content="0; url=${appUrl}">
  <style>
    body { font-family: system-ui, sans-serif; background: #1c1917; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
    .card { background: #292524; padding: 2rem; border-radius: 1rem; border: 1px solid #d97706; max-width: 380px; }
    h1 { color: #f59e0b; margin-bottom: 0.5rem; font-size: 1.5rem; }
    p { color: #d6d3d1; font-size: 0.9rem; }
    a { display: inline-block; margin-top: 1rem; background: #d97706; color: #000; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 0.5rem; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Kebab Turki-Pollito</h1>
    <p>Abriendo la aplicación oficial de pedidos online...</p>
    <a href="${appUrl}">Abrir Aplicación Ahora</a>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Kebab-Turki-Pollito-App.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(language === 'es' ? '✓ Acceso directo descargado en tu dispositivo' : '✓ App launcher shortcut downloaded');
  };

  return (
    <section id="descargar-app" className="py-12 sm:py-16 bg-stone-900 text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute left-1/3 top-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-stone-850 to-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('appBadge')}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {language === 'es' ? (
                  <>
                    Pide en 2 toques desde <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                      Nuestra App Oficial
                    </span>
                  </>
                ) : (
                  <>
                    Order in 2 taps with <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                      Our Official App
                    </span>
                  </>
                )}
              </h2>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {language === 'es'
                  ? 'Olvídate de esperas al teléfono. Con la aplicación oficial de Kebab Turki-Pollito puedes instalar el acceso directo en tu móvil o tablet, recibir alertas push automáticas, seguir al repartidor en vivo por La Zubia y repetir tus menús favoritos.'
                  : 'Skip waiting on the phone. With the official Kebab Turki-Pollito app, install directly onto your mobile or tablet, receive live push alerts, track your driver across La Zubia in real time and reorder your favorites.'}
              </p>

              {/* Promo box */}
              <div className="bg-stone-900/90 border border-amber-500/40 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-amber-200 font-bold block">
                    {language === 'es' ? '¡Oferta de bienvenida exclusiva!' : 'Exclusive Welcome Discount!'}
                  </span>
                  <span className="text-stone-400 text-xs">
                    {language === 'es' ? 'Usa el cupón en tu primer pedido desde la web o app' : 'Use coupon on your first order via web or app'}
                  </span>
                </div>

                <button
                  id="copy-promo-code-btn"
                  type="button"
                  onClick={handleCopyPromo}
                  className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>CÓDIGO: APP10 (-10%)</span>
                </button>
              </div>

              {/* Feature checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{language === 'es' ? 'Seguimiento GPS en tiempo real' : 'Real-time GPS tracking'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{language === 'es' ? 'Pago con 1 toque (Bizum / Tarjeta / Efectivo)' : '1-Tap payment (Bizum / Card / Cash)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{language === 'es' ? 'Funciona offline y con carga instantánea (PWA)' : 'Instant offline & quick load (PWA)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{language === 'es' ? 'Repetición rápida de pedidos anteriores' : 'Reorder previous meals'}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="install-pwa-direct-btn"
                  type="button"
                  onClick={handleInstallClick}
                  className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-extrabold px-6 py-3.5 rounded-xl text-xs sm:text-sm flex items-center gap-2.5 shadow-lg shadow-amber-900/30 transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {isInstalled || installSuccess
                      ? (language === 'es' ? '✓ App Instalada' : '✓ App Installed')
                      : isInstallable
                      ? (language === 'es' ? 'Instalar App Directa' : 'Install Direct App')
                      : (language === 'es' ? 'Descargar e Instalar App' : 'Download & Install App')}
                  </span>
                </button>

                <button
                  id="download-app-file-btn"
                  type="button"
                  onClick={handleDownloadLauncherFile}
                  className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold px-4 py-3.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-stone-700 transition-colors cursor-pointer"
                  title="Descargar acceso directo de la aplicación"
                >
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  <span>{language === 'es' ? 'Descargar Acceso Directo' : 'Download App Shortcut'}</span>
                </button>

                <button
                  id="open-app-simulator-btn"
                  type="button"
                  onClick={() => setIsAppModalOpen(true)}
                  className="text-stone-400 hover:text-stone-200 text-xs flex items-center gap-1.5 underline py-2 cursor-pointer"
                >
                  <span>{language === 'es' ? 'Ver instrucciones de instalación' : 'View install instructions'}</span>
                </button>
              </div>

            </div>

            {/* Right Side: QR Code & Mobile Mockup */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="bg-white text-stone-900 p-6 rounded-3xl shadow-2xl border-4 border-amber-600/30 text-center max-w-xs w-full">
                <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <QrCode className="w-6 h-6" />
                </div>

                <h3 className="font-black text-base text-stone-900">
                  {t('scanQrToInstall')}
                </h3>
                <p className="text-xs text-stone-500 mt-1 mb-4">
                  {language === 'es' 
                    ? 'Escanea con la cámara de tu móvil para abrir e instalar la app al instante'
                    : 'Scan with smartphone camera to open and install the app instantly'}
                </p>

                {/* SVG QR Code */}
                <div className="bg-stone-100 p-3 rounded-2xl border border-stone-200 aspect-square flex items-center justify-center mb-3">
                  <svg viewBox="0 0 100 100" className="w-40 h-40 fill-stone-900">
                    <rect x="10" y="10" width="25" height="25" fill="#1c1917" />
                    <rect x="15" y="15" width="15" height="15" fill="#fff" />
                    <rect x="18" y="18" width="9" height="9" fill="#1c1917" />

                    <rect x="65" y="10" width="25" height="25" fill="#1c1917" />
                    <rect x="70" y="15" width="15" height="15" fill="#fff" />
                    <rect x="73" y="18" width="9" height="9" fill="#1c1917" />

                    <rect x="10" y="65" width="25" height="25" fill="#1c1917" />
                    <rect x="15" y="70" width="15" height="15" fill="#fff" />
                    <rect x="18" y="73" width="9" height="9" fill="#1c1917" />

                    <rect x="42" y="15" width="8" height="18" fill="#d97706" />
                    <rect x="42" y="42" width="16" height="16" fill="#1c1917" />
                    <rect x="65" y="45" width="20" height="8" fill="#1c1917" />
                    <rect x="45" y="68" width="8" height="20" fill="#d97706" />
                    <rect x="68" y="68" width="20" height="20" fill="#1c1917" />
                  </svg>
                </div>

                <div className="text-[11px] font-bold text-amber-800 bg-amber-50 py-1 px-2 rounded-lg flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>{language === 'es' ? 'PWA Oficial · Compatible iOS & Android' : 'Official PWA · iOS & Android Ready'}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Interactive App Simulator & Install Guidance Modal */}
      {isAppModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-xs overflow-y-auto">
          <div 
            className="bg-stone-900 rounded-3xl max-w-sm sm:max-w-md w-full overflow-hidden shadow-2xl border-4 border-stone-700 text-white my-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Phone Top Notch */}
            <div className="bg-stone-950 p-2.5 flex items-center justify-between text-[11px] text-stone-400 border-b border-stone-800">
              <span className="font-bold">20:45</span>
              <div className="w-20 h-4 bg-stone-800 rounded-full mx-auto" />
              <span>5G · 100%</span>
            </div>

            {/* App Screen Content */}
            <div className="p-5 space-y-4 bg-gradient-to-b from-stone-900 to-stone-950 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-base text-white flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-amber-400" />
                    App Oficial Turki-Pollito
                  </h4>
                  <p className="text-xs text-amber-400">
                    {language === 'es' ? 'Instalación PWA directa en tu pantalla de inicio' : 'Direct PWA install on home screen'}
                  </p>
                </div>
                <button
                  id="close-app-modal-btn"
                  type="button"
                  onClick={() => setIsAppModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Install trigger button */}
              <button
                id="modal-direct-install-btn"
                type="button"
                onClick={async () => {
                  if (isInstallable) {
                    const ok = await install();
                    if (ok) {
                      setInstallSuccess(true);
                      showToast(language === 'es' ? '✓ ¡App instalada!' : '✓ App installed!');
                      setIsAppModalOpen(false);
                      return;
                    }
                  }
                  handleDownloadLauncherFile();
                }}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-black py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.01] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>
                  {isInstallable 
                    ? (language === 'es' ? 'Instalar Ahora en 1 Clic' : 'Install Now with 1 Click')
                    : (language === 'es' ? 'Descargar Acceso Directo de la App' : 'Download App Launcher')}
                </span>
              </button>

              {/* Push Notification Mockup */}
              <div className="bg-stone-800/90 border border-amber-500/40 rounded-xl p-3 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-stone-400">
                  <span className="flex items-center gap-1 text-amber-300 font-bold">
                    <Bell className="w-3 h-3" /> Turki-Pollito Notificaciones
                  </span>
                  <span>{language === 'es' ? 'Ahora' : 'Now'}</span>
                </div>
                <p className="text-xs font-bold text-white">
                  🛵 {language === 'es' ? 'Tu pedido #KT-7824 va en camino' : 'Your order #KT-7824 is on its way'}
                </p>
                <p className="text-[11px] text-stone-300">
                  {language === 'es' 
                    ? 'Repartidor en moto entregará en La Zubia en aprox. 12 minutos.'
                    : 'Courier on scooter will deliver in La Zubia in approx. 12 minutes.'}
                </p>
              </div>

              {/* Step by Step Guide for iOS / Android / Desktop */}
              <div className="bg-stone-800/60 border border-stone-700/60 rounded-xl p-4 space-y-3 text-xs">
                <span className="font-black text-amber-300 block text-xs uppercase tracking-wider">
                  {language === 'es' ? 'Guía rápida de instalación:' : 'Quick install instructions:'}
                </span>

                {/* iPhone / Safari */}
                <div className="bg-stone-900/60 p-2.5 rounded-lg border border-stone-800 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-stone-200">
                    <Share2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>iPhone / iPad (Safari)</span>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    {language === 'es'
                      ? '1. Pulsa el botón "Compartir" en Safari (icono de cuadrado con flecha hacia arriba). 2. Desliza hacia abajo y elige "Añadir a pantalla de inicio".'
                      : '1. Tap the "Share" button in Safari (box with upward arrow). 2. Scroll down and tap "Add to Home Screen".'}
                  </p>
                </div>

                {/* Android / Chrome */}
                <div className="bg-stone-900/60 p-2.5 rounded-lg border border-stone-800 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-stone-200">
                    <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Android (Chrome / Samsung Internet)</span>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    {language === 'es'
                      ? 'Pulsa el botón de arriba "Instalar" o los 3 puntos del navegador y selecciona "Instalar aplicación" o "Añadir a la pantalla principal".'
                      : 'Tap the "Install" button above or the browser\'s 3-dot menu and select "Install app" or "Add to Home screen".'}
                  </p>
                </div>

                {/* Desktop */}
                <div className="bg-stone-900/60 p-2.5 rounded-lg border border-stone-800 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-stone-200">
                    <Monitor className="w-3.5 h-3.5 text-amber-400" />
                    <span>PC / Mac (Chrome, Edge)</span>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    {language === 'es'
                      ? 'Haz clic en el icono de instalación en la barra de direcciones del navegador para instalar la aplicación de escritorio.'
                      : 'Click the install icon in your browser address bar to install the desktop application.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  id="start-using-app-btn"
                  type="button"
                  onClick={() => {
                    showToast(language === 'es' ? '✓ ¡Todo listo para pedir online!' : '✓ Ready to order online!');
                    setIsAppModalOpen(false);
                  }}
                  className="flex-1 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold py-2.5 rounded-xl text-xs cursor-pointer transition-colors text-center"
                >
                  {language === 'es' ? 'Cerrar y Continuar en la Web' : 'Close and Continue on Web'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
