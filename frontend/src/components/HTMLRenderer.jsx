import DOMPurify from 'dompurify';

const HtmlRenderer = ({ htmlContent }) => {
  const sanitizedHTML = DOMPurify.sanitize(htmlContent);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

export default HtmlRenderer;
