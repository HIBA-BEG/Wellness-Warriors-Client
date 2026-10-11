import { buildEventPrintHtml, escapeHtml } from '../src/utils/printEvent';

describe('print event html', () => {
  it('escapes dynamic text before writing the print document', () => {
    const html = buildEventPrintHtml({
      title: '<script>alert(1)</script>',
      description: '<img src=x onerror="alert(1)">',
      location: '"><script>alert(1)</script>',
      startDate: '2026-01-01T10:00:00.000Z',
      endDate: '2026-01-01T12:00:00.000Z',
      participants: [{ firstName: '<b>Amina', lastName: 'Ben&nani' }],
    });

    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<img');
    expect(html).not.toContain('<b>');
    expect(html).toContain(escapeHtml('<script>alert(1)</script>'));
    expect(html).toContain('Ben&amp;nani');
  });
});
