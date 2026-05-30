import styled from "styled-components";
import ScrollBars from "styles/common/ScrollBars";
import { DEFAULT_SCROLLBAR_WIDTH } from "utils/constants";

const StyledBlog = styled.div`
  background-color: #1a1b26;
  color: #a9b1d6;
  display: flex;
  height: 100%;
  overflow: hidden;
  width: 100%;

  nav {
    ${ScrollBars(DEFAULT_SCROLLBAR_WIDTH, 2, 0, "light")};
    background-color: #16161e;
    border-right: 1px solid #2f3340;
    display: flex;
    flex-direction: column;
    min-width: 220px;
    overflow-y: auto;
    padding: 12px;
    width: 220px;

    h2 {
      color: #7aa2f7;
      font-size: 14px;
      font-weight: 600;
      margin: 0 0 12px 0;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        border-left: 2px solid transparent;
        color: #565f89;
        cursor: pointer;
        font-size: 13px;
        margin-bottom: 2px;
        padding: 8px 10px;
        transition: all 0.15s ease;

        &:hover {
          background-color: #1f2233;
          border-left-color: #3b4261;
          color: #a9b1d6;
        }

        &.active {
          background-color: #1f2233;
          border-left-color: #7aa2f7;
          color: #c0caf5;
          font-weight: 500;
        }

        .post-title {
          display: block;
        }

        .post-date {
          color: #565f89;
          font-size: 11px;
          margin-top: 2px;
        }
      }
    }
  }

  article {
    ${ScrollBars(DEFAULT_SCROLLBAR_WIDTH, 0, 2, "light")};
    box-sizing: border-box;
    flex: 1;
    font-size: 15px;
    line-height: 1.7;
    overflow-wrap: break-word;
    overflow-y: auto;
    padding: 32px 48px;
    user-select: text;

    * {
      all: revert;
      user-select: text;
    }

    a {
      color: #7dcfff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    blockquote {
      border-left: 3px solid #7aa2f7;
      color: #565f89;
      margin: 16px 0;
      padding: 8px 16px;
    }

    code {
      background-color: #1f2233;
      border-radius: 3px;
      color: #bb9af7;
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
      font-size: 13px;
      padding: 2px 6px;
    }

    pre {
      background-color: #1f2233;
      border-radius: 6px;
      overflow-x: auto;
      padding: 16px;

      code {
        background: none;
        padding: 0;
      }
    }

    h1, h2, h3, h4 {
      color: #c0caf5;
      margin: 24px 0 12px;
    }

    h1 {
      border-bottom: 1px solid #2f3340;
      font-size: 2em;
      padding-bottom: 8px;
    }

    h2 {
      border-bottom: 1px solid #2f3340;
      font-size: 1.5em;
      padding-bottom: 6px;
    }

    h3 { font-size: 1.2em; }

    img {
      border-radius: 6px;
      max-width: 100%;
    }

    p {
      margin: 12px 0;
    }

    table {
      border-collapse: collapse;
      margin: 16px 0;
      width: 100%;

      th, td {
        border: 1px solid #2f3340;
        padding: 8px 12px;
        text-align: left;
      }

      th {
        background-color: #1f2233;
        color: #7aa2f7;
        font-weight: 600;
      }

      tr:nth-child(even) {
        background-color: #16161e;
      }
    }

    ul, ol {
      padding-inline-start: 24px;
    }

    hr {
      border: none;
      border-top: 1px solid #2f3340;
      margin: 24px 0;
    }

    &.empty-state {
      align-items: center;
      color: #565f89;
      display: flex;
      font-size: 16px;
      justify-content: center;
    }
  }
`;

export default StyledBlog;
