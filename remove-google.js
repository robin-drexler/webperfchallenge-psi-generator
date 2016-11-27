const input = process.argv[2];

console.log(
    JSON.stringify(
        {
            topsites: JSON.parse(input)
                .topsites
                .filter((entry) => {
                    return !entry.site.startsWith('http://google.') || entry.site == 'http://google.com'
                })
        }
    )
);