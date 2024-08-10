"use client";

import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import { stringToColour } from "@/lib/utils";

const Editor = () => {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);

    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc.destroy();
      yProvider.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl p-5">
      <div className="mb-10 flex items-center justify-end gap-2">
        <Button onClick={() => setDarkMode((prev) => !prev)}>
          {darkMode ? <Sun /> : <Moon />}
        </Button>
      </div>
      <Blocknote doc={doc} provider={provider} darkMode={darkMode} />
    </div>
  );
};
export default Editor;

const Blocknote = ({
  doc,
  provider,
  darkMode,
}: {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
  darkMode: boolean;
}) => {
  const userInfo = useSelf((me) => me.info);

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("doc-store"),
      user: {
        name: userInfo.name,
        color: stringToColour(userInfo.email),
      },
    },
  });

  return (
    <div className="relative">
      <BlockNoteView
        editor={editor}
        className="min-h-screen"
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
};
