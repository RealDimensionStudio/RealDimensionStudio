import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

function getDriveFileId(url) {
  if (!url) {
    return null;
  }

  const filePathMatch = url.match(/\/file\/d\/([^/]+)/);
  if (filePathMatch?.[1]) {
    return filePathMatch[1];
  }

  const idParamMatch = url.match(/[?&]id=([^&]+)/);
  return idParamMatch?.[1] ?? null;
}

export default function PdfPreviewModal({ onClose, title, previewUrl, externalUrl }) {
  const driveFileId = getDriveFileId(previewUrl) ?? getDriveFileId(externalUrl);
  const embedCandidates = driveFileId
    ? [
        {
          label: "Drive Preview",
          url: `https://drive.google.com/file/d/${driveFileId}/preview`,
        },
        {
          label: "Google Viewer",
          url: `https://docs.google.com/viewer?srcid=${driveFileId}&pid=explorer&efh=false&a=v&chrome=false&embedded=true`,
        },
        {
          label: "GView PDF",
          url: `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(`https://drive.google.com/uc?export=download&id=${driveFileId}`)}`,
        },
      ]
    : [{ label: "Preview", url: previewUrl }];
  const [viewerIndex, setViewerIndex] = useState(0);
  const embedUrl = embedCandidates[viewerIndex]?.url ?? previewUrl;
  const viewerLabel = embedCandidates[viewerIndex]?.label ?? "Preview";

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    (
    <div className="fixed inset-0 z-[120] flex items-end justify-center bg-black/80 px-0 pt-2 backdrop-blur-sm">
      <div className="absolute inset-0" aria-hidden="true" onClick={onClose} />

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex h-[90vh] w-full flex-col overflow-hidden rounded-t-[16px] bg-brand-darker shadow-[0_20px_60px_rgba(0,0,0,0.45)] md:h-[90vh] md:w-[60vw] md:rounded-t-[18px] md:rounded-b-none"
      >
        <div className="flex items-center justify-between gap-3 border-b border-brand-lightYellow/10 px-3 py-3 md:px-4">
          <div>
            <div className="mb-2 h-1 w-10 rounded-full bg-brand-lightYellow/20" />
            <p className="text-xs uppercase tracking-[0.35em] text-brand-red">Company Profile</p>
            <h3
              className="mt-1 text-xl text-brand-lightYellow md:text-2xl"
              style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.05em" }}
            >
              {title}
            </h3>
            <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-brand-lightYellow/40 md:text-xs">
              Viewer: {viewerLabel}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={externalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-brand-red/40 bg-brand-red/10 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-brand-lightYellow transition-all duration-200 hover:border-brand-red hover:bg-brand-red hover:text-brand-lightYellow md:px-4 md:text-xs"
            >
              Open Tab
            </a>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-lightYellow/15 text-brand-lightYellow/70 transition-all duration-200 hover:border-brand-red hover:bg-brand-red hover:text-brand-lightYellow md:h-10 md:w-10"
              aria-label="Close preview"
            >
              X
            </button>
          </div>
        </div>

        <div className="relative h-full w-full bg-white">
          <iframe
            title={title}
            src={embedUrl}
            className="h-full w-full bg-white"
            allow="autoplay"
          />
        </div>
        <div className="h-px w-full bg-brand-lightYellow/10" />
      </motion.div>
    </div>
    ),
    document.body
  );
}
