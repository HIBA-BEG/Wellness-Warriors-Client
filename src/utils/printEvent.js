export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function buildEventPrintHtml(event) {
  const participants =
    event.participants
      ?.map(
        (participant) =>
          `<li>${escapeHtml(participant.firstName)} ${escapeHtml(participant.lastName)}</li>`
      )
      .join('') || 'No participants yet';

  return `<!DOCTYPE html>
<html>
  <head>
    <title>${escapeHtml(event.title)} - Event Details</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; }
      h1 { color: #2C5F2D; }
      .section { margin-bottom: 20px; }
    </style>
  </head>
  <body>
    <h1>${escapeHtml(event.title)}</h1>
    <div class="section">
      <h2>Event Details</h2>
      <p>From: ${escapeHtml(formatDate(event.startDate))}</p>
      <p>To: ${escapeHtml(formatDate(event.endDate))}</p>
      <p>Location: ${escapeHtml(event.location)}</p>
      <p>Description: ${escapeHtml(event.description)}</p>
    </div>
    <div class="section">
      <h2>Participants</h2>
      <ul>
        ${participants}
      </ul>
    </div>
  </body>
</html>`;
}
