import { SanityDocument } from '@sanity/client';
import { Iframe } from 'sanity-plugin-iframe-pane';
import { DefaultDocumentNodeResolver } from 'sanity/desk';

// Customise this function to show the correct URL based on the current document
function getPreviewUrl(doc: SanityDocument) {
  return doc?.slug?.current
    ? `${window.location.protocol}//${window.location.host}/post/${doc.slug.current}`
    : `${window.location.host}`;
}

// Import this into the deskTool() plugin
export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  // Only show preview pane on `post` schema type documents
  switch (schemaType) {
    case `post`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: SanityDocument) => getPreviewUrl(doc),
            defaultSize: `desktop`,
            reload: {
              button: true,
            },
          })
          .title('Preview'),
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};
