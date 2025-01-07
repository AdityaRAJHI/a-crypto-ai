// Existing dashboard JavaScript code...

    // Function to handle sidebar navigation
    function handleSidebarClick(event) {
      const target = event.target;
      if (target.tagName === 'A' && target.classList.contains('sidebar-link')) {
        // Prevent default link behavior
        event.preventDefault();

        // Hide all sections
        const sections = document.querySelectorAll('.dashboard-section');
        sections.forEach(section => section.style.display = 'none');

        // Get the target section ID
        const sectionId = target.getAttribute('data-section');

        // Find the section element and show it
        const sectionToShow = document.getElementById(sectionId);
        if (sectionToShow) {
          sectionToShow.style.display = 'block';
        } else {
          console.error(`Section with ID "${sectionId}" not found.`);
        }
      }
    }

    // Add event listener to the sidebar
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.addEventListener('click', handleSidebarClick);
    } else {
      console.error('Sidebar element not found.');
    }

    // Example data for the sections (replace with your actual data)
    const sectionData = {
      overview: {
        title: 'Overview',
        data: [], // Fetch data for overview
      },
      crypto: {
        title: 'Crypto Data',
        data: [], // Fetch data for crypto
      },
      targets: {
        title: 'Targets',
        data: [], // Fetch data for targets
      },
      marketTrend: {
        title: 'Market Trend',
        data: [], // Fetch data for market trend
      },
    };

    // Function to fetch and display data for a section
    async function loadSectionData(sectionId) {
      const section = sectionData[sectionId];
      if (section) {
        try {
          // Replace with your actual data fetching logic
          const fetchedData = await fetch(`/api/data/${sectionId}`); // Example API endpoint
          const jsonData = await fetchedData.json();
          section.data = jsonData; // Update section data
          // Update the content of the section with the fetched data
          const sectionElement = document.getElementById(sectionId);
          if (sectionElement) {
            sectionElement.innerHTML = `<h3>${section.title}</h3><pre>${JSON.stringify(section.data, null, 2)}</pre>`;
          }
        } catch (error) {
          console.error(`Error loading data for section "${sectionId}":`, error);
        }
      } else {
        console.error(`Section "${sectionId}" not found in sectionData.`);
      }
    }

    // Load data for the default section (e.g., 'overview')
    loadSectionData('overview');
