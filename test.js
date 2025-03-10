
const baseURL = "https://instadeep.dev.deeppack.ai";
const pattern = new RegExp(`^${baseURL}/(.*)/containers/1$`);

// Now you can use the pattern to match URLs
const url = "https://instadeep.dev.deeppack.ai/loads/87c407e2-0332-4619-b1cf-a0e89b4ddfd0/runs/4e44a3d3-83cb-41a9-a779-06685ca222ca/containers/1";

const match = url.match(pattern);

if (match) {
  const matchedPart = match[1];
  console.log(`Matched part before "/containers/1": ${matchedPart}`);
  // Additional code here
  return true; // or do something else when the URL matches
} else {
  console.log('URL did not match the pattern');
  return false; // or do something else when the URL doesn't match
}