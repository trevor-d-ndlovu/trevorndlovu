import styled from "styled-components";
import ScrollBars from "styles/common/ScrollBars";
import { DEFAULT_SCROLLBAR_WIDTH } from "utils/constants";

const StyledProjects = styled.div`
  background-color: #1a1b26;
  color: #a9b1d6;
  height: 100%;
  overflow-y: auto;
  padding: 32px;
  width: 100%;
  ${ScrollBars(DEFAULT_SCROLLBAR_WIDTH, 0, 0, "light")};

  h1 {
    color: #c0caf5;
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 8px 0;
  }

  .subtitle {
    color: #565f89;
    font-size: 14px;
    margin-bottom: 32px;
  }

  .projects-grid {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }

  .project-card {
    background-color: #1f2233;
    border: 1px solid #2f3340;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: border-color 0.2s ease, transform 0.2s ease;

    &:hover {
      border-color: #3b4261;
      transform: translateY(-2px);
    }

    .card-header {
      padding: 20px 20px 0;

      h2 {
        color: #7aa2f7;
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 8px 0;
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 12px;

        .tag {
          background-color: #2f3340;
          border-radius: 4px;
          color: #bb9af7;
          font-size: 11px;
          padding: 3px 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      }
    }

    .card-description {
      color: #a9b1d6;
      flex: 1;
      font-size: 14px;
      line-height: 1.6;
      padding: 12px 20px;
    }

    .card-links {
      border-top: 1px solid #2f3340;
      display: flex;
      padding: 12px 20px;

      a {
        color: #7dcfff;
        font-size: 13px;
        margin-right: 16px;
        text-decoration: none;
        transition: color 0.15s ease;

        &:hover {
          color: #7aa2f7;
          text-decoration: underline;
        }

        &::before {
          content: "→ ";
        }
      }
    }
  }

  .empty-state {
    color: #565f89;
    font-size: 16px;
    margin-top: 60px;
    text-align: center;
  }
`;

export default StyledProjects;
