import DOMPurify from 'dompurify';

const HtmlRenderer = ({ htmlContent }) => {
  // const sanitizedHTML = DOMPurify.sanitize(htmlContent);
  // return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default HtmlRenderer;
