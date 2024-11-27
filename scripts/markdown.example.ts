const mdSample = ` # Markdown Extended Tables

## Column Spanning

| H1      | H2      | H3      |
|---------|---------|---------|
| This cell spans 3 columns |||

## Row Spanning

| H1           | H2      |
|--------------|---------|
| This cell    | Cell A  |
| spans three ^| Cell B  |
| rows        ^| Cell C  |

## Multi-row headers

| This header spans two   || Header A |
| columns *and* two rows ^|| Header B |
|-------------|------------|----------|
| Cell A      | Cell B     | Cell C   |
`;

export default mdSample;
