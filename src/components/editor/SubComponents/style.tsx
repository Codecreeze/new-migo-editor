import { alpha, useTheme } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";

type ThemeMode = "light" | "dark";

interface MeaxoEditorStylesProps {
  themeMode?: ThemeMode;
}

// MeaxoEditor themed styles converted from SCSS
export const MeaxoEditorStyles = ({
  themeMode = "light",
}: MeaxoEditorStylesProps) => {
  const theme = useTheme();
  const isDark = themeMode === "dark";

  return (
    <GlobalStyles
      styles={{
        // Global dark theme overrides
        ...(isDark && {
          ".MuiDialog-paper": {
            backgroundColor: "#1e1e1e !important",
            color: "#ffffff !important",
          },
          ".MuiDialogTitle-root": {
            backgroundColor: "#1e1e1e !important",
            color: "#ffffff !important",
          },
          ".MuiDialogContent-root": {
            backgroundColor: "#1e1e1e !important",
            color: "#ffffff !important",
          },
          ".MuiDialogActions-root": {
            backgroundColor: "#1e1e1e !important",
            color: "#ffffff !important",
          },
          ".MuiPopover-paper": {
            backgroundColor: "#2a2a2a !important",
            color: "#ffffff !important",
            border: "1px solid #3a3a3a !important",
          },
          ".MuiTooltip-tooltip": {
            backgroundColor: "#2a2a2a !important",
            color: "#ffffff !important",
          },
          ".MuiButton-root": {
            color: "#ffffff !important",
          },
          ".MuiTypography-root": {
            color: "#ffffff !important",
          },
        }),
        ".meaxo-editor-container": {
          display: "flex",
          flexDirection: "column",
          height: "100%",
          border: `1px solid ${isDark ? "#3a3a3a" : "#e0e0e0"}`,
          borderRadius: theme.shape.borderRadius,
          overflow: "hidden",
          backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
          color: isDark ? "#ffffff" : "#000000",
        },
        ".meaxo-editor-toolbar": {
          display: "flex",
          alignItems: "center",
          gap: theme.spacing(0.5),
          padding: theme.spacing(0.5),
          backgroundColor: isDark ? "#2a2a2a" : "#f5f5f5",
          flexWrap: "wrap",
          "& .toolbar-group": {
            display: "flex",
            alignItems: "center",
            gap: theme.spacing(0.5),
          },
          "& .is-active": {
            backgroundColor: `${theme.palette.primary.main}`,
            color: "#ffffff !important",
            borderRadius: "12px",
            "&:hover": {
              backgroundColor: `${alpha(theme.palette.primary.main, 0.9)} !important`,
            },
          },
          "& button": {
            minWidth: "32px",
            height: "32px",
            borderRadius: "7px",
            transition: "all 0.2s ease !important",
            color: isDark ? "#ffffff" : "inherit",
            "&:hover": {
              backgroundColor: `${alpha(theme.palette.primary.main, 0.1)} !important`,
            },
          },
          "& .MuiIconButton-root": {
            borderRadius: "7px",
            transition: "all 0.2s ease !important",
            minWidth: "32px",
            height: "32px",
            color: isDark ? "#ffffff" : "inherit",
            "&:hover": {
              backgroundColor: `${alpha(theme.palette.primary.main, 0.1)} !important`,
            },
            "&.is-active": {
              backgroundColor: `${theme.palette.primary.main} !important`,
              color: "#ffffff !important",
              "&:hover": {
                backgroundColor: `${alpha(theme.palette.primary.main, 0.9)} !important`,
              },
            },
          },
          "& .MuiToggleButton-root": {
            color: isDark ? "#ffffff" : "inherit",
            borderColor: isDark ? "#3a3a3a" : "rgba(0, 0, 0, 0.12)",
            "&:hover": {
              backgroundColor: `${alpha(theme.palette.primary.main, 0.1)} !important`,
            },
          },
          "& svg": {
            color: isDark ? "#ffffff" : "inherit",
          },
          "& .dropdown-button": {
            minWidth: "40px !important",
            maxWidth: "85px !important",
            "& .MuiTypography-root": {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "80px",
            },
          },
        },
        ".meaxo-editor-content": {
          flex: 1,
          overflowY: "auto",
          padding: theme.spacing(2),
          backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
          "& .ProseMirror": {
            minHeight: "400px",
            outline: "none",
            color: isDark ? "#d4d4d4" : "inherit",
            backgroundColor: isDark ? "#1e1e1e" : "transparent",
            "&:focus": {
              outline: "none",
            },
            // Headings
            "& h1": {
              fontSize: "2rem",
              fontWeight: 700,
              margin: `${theme.spacing(2)} 0`,
              lineHeight: 1.2,
              color: isDark ? "#e4e4e4" : "inherit",
            },
            "& h2": {
              fontSize: "1.75rem",
              fontWeight: 700,
              margin: `${theme.spacing(2)} 0`,
              lineHeight: 1.3,
              color: isDark ? "#e4e4e4" : "inherit",
            },
            "& h3": {
              fontSize: "1.5rem",
              fontWeight: 600,
              margin: `${theme.spacing(1)} 0`,
              lineHeight: 1.4,
              color: isDark ? "#e4e4e4" : "inherit",
            },
            "& h4": {
              fontSize: "1.25rem",
              fontWeight: 600,
              margin: `${theme.spacing(1)} 0`,
              lineHeight: 1.4,
              color: isDark ? "#e4e4e4" : "inherit",
            },
            "& h5": {
              fontSize: "1.125rem",
              fontWeight: 600,
              margin: `${theme.spacing(1)} 0`,
              lineHeight: 1.4,
              color: isDark ? "#e4e4e4" : "inherit",
            },
            "& h6": {
              fontSize: "1rem",
              fontWeight: 600,
              margin: `${theme.spacing(1)} 0`,
              lineHeight: 1.4,
              color: isDark ? "#e4e4e4" : "inherit",
            },
            // Paragraph
            "& p": {
              margin: `${theme.spacing(1)} 0`,
              lineHeight: 1.6,
            },
            // Lists
            "& ul, & ol": {
              paddingLeft: theme.spacing(4),
              margin: `${theme.spacing(1)} 0`,
              "& li": {
                margin: `${theme.spacing(0.5)} 0`,
                "& p": {
                  margin: 0,
                },
              },
            },
            "& ul": {
              listStyleType: "disc",
            },
            "& ol": {
              listStyleType: "decimal",
            },
            // Code block
            "& pre": {
              backgroundColor: isDark ? "#1a1a1a" : "#1e1e1e",
              color: "#d4d4d4",
              padding: theme.spacing(2),
              borderRadius: theme.shape.borderRadius,
              overflowX: "auto",
              margin: `${theme.spacing(1)} 0`,
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: "0.875rem",
              "& code": {
                background: "none",
                padding: 0,
                color: "inherit",
              },
            },
            // Inline code
            "& code": {
              backgroundColor: isDark
                ? alpha("#4a9eff", 0.2)
                : alpha(theme.palette.primary.main, 0.1),
              color: isDark ? "#4a9eff" : theme.palette.primary.main,
              padding: "2px 6px",
              borderRadius: "4px",
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: "0.875rem",
            },
            // Blockquote
            "& blockquote": {
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              paddingLeft: theme.spacing(2),
              margin: `${theme.spacing(2)} 0`,
              color: isDark ? "#a0a0a0" : "#757575",
              fontStyle: "italic",
            },
            // Horizontal rule
            "& hr": {
              border: "none",
              borderTop: `2px solid ${isDark ? "#3a3a3a" : "#e0e0e0"}`,
              margin: `${theme.spacing(3)} 0`,
            },
            // Link
            "& a, & .custom-link": {
              color: isDark ? "#4a9eff" : theme.palette.primary.main,
              textDecoration: "underline",
              cursor: "pointer",
              transition: "color 0.2s",
              "&:hover": {
                color: isDark
                  ? "#6bb6ff"
                  : alpha(theme.palette.primary.main, 0.85),
              },
            },
            // Text formatting
            "& strong": {
              fontWeight: 700,
            },
            "& em": {
              fontStyle: "italic",
            },
            "& u": {
              textDecoration: "underline",
            },
            "& s": {
              textDecoration: "line-through",
            },
            // Highlight
            "& mark": {
              backgroundColor: "#fef08a",
              padding: "2px 4px",
              borderRadius: "2px",
            },
            // Placeholder
            "& p.is-editor-empty:first-of-type::before": {
              content: "attr(data-placeholder)",
              float: "left",
              color: isDark ? "#888888" : "#757575",
              pointerEvents: "none",
              height: 0,
            },
            // Tables
            "& table": {
              borderCollapse: "collapse",
              tableLayout: "fixed",
              width: "100%",
              margin: `${theme.spacing(2)} 0`,
              overflow: "hidden",
              "& td, & th": {
                minWidth: "1em",
                border: `2px solid ${isDark ? "#3a3a3a" : "#e0e0e0"}`,
                padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
                verticalAlign: "top",
                boxSizing: "border-box",
                position: "relative",
                color: isDark ? "#d4d4d4" : "inherit",
                "& > *": {
                  marginBottom: 0,
                },
              },
              "& th": {
                fontWeight: "bold",
                textAlign: "left",
                backgroundColor: isDark ? "#2a2a2a" : "#f5f5f5",
                color: isDark ? "#ffffff" : "inherit",
              },
              "& .selectedCell:after": {
                zIndex: 2,
                position: "absolute",
                content: '""',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                background: alpha(theme.palette.primary.main, 0.1),
                pointerEvents: "none",
              },
              "& .column-resize-handle": {
                position: "absolute",
                right: "-2px",
                top: 0,
                bottom: "-2px",
                width: "4px",
                backgroundColor: theme.palette.primary.main,
                pointerEvents: "none",
              },
            },
            // Images
            "& img": {
              maxWidth: "600px",
              maxHeight: "600px",
              height: "100%",
              width: "100%",
              display: "block",
              margin: `${theme.spacing(2)} auto`,
              borderRadius: theme.shape.borderRadius,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              "&.ProseMirror-selectednode": {
                outline: `3px solid ${theme.palette.primary.main}`,
              },
            },
            // Task Lists
            '& ul[data-type="taskList"]': {
              listStyle: "none",
              paddingLeft: 0,
              "& li": {
                display: "flex",
                alignItems: "flex-start",
                margin: `${theme.spacing(0.5)} 0`,
                "& > label": {
                  flex: "0 0 auto",
                  marginRight: theme.spacing(1),
                  userSelect: "none",
                  cursor: "pointer",
                },
                "& > div": {
                  flex: "1 1 auto",
                },
                '& input[type="checkbox"]': {
                  cursor: "pointer",
                  width: "18px",
                  height: "18px",
                  marginTop: "2px",
                },
                '&[data-checked="true"] > div': {
                  textDecoration: "line-through",
                  opacity: 0.6,
                },
              },
            },
            // YouTube Embeds
            "& div[data-youtube-video]": {
              margin: `${theme.spacing(2)} 0`,
              textAlign: "center",
              "& iframe": {
                maxWidth: "100%",
                borderRadius: theme.shape.borderRadius,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              },
            },
            // Callouts
            "& div[data-callout]": {
              borderRadius: theme.shape.borderRadius,
              padding: theme.spacing(2),
              margin: `${theme.spacing(2)} 0`,
              position: "relative",
              "& .callout-title": {
                fontWeight: 700,
                fontSize: "1.1rem",
                marginBottom: theme.spacing(1),
                display: "flex",
                alignItems: "center",
                gap: theme.spacing(0.5),
              },
              "& .callout-content": {
                "& p:last-child": {
                  marginBottom: 0,
                },
              },
              "&.callout-info": {
                borderLeft: "4px solid #0066cc",
                backgroundColor: "#e7f3ff",
                "& .callout-title": {
                  color: "#0047b2",
                },
              },
              "&.callout-warning": {
                borderLeft: "4px solid #ff9900",
                backgroundColor: "#fff4e6",
                "& .callout-title": {
                  color: "#b26b00",
                },
              },
              "&.callout-error": {
                borderLeft: "4px solid #e60000",
                backgroundColor: "#ffe6e6",
                "& .callout-title": {
                  color: "#a10000",
                },
              },
              "&.callout-success": {
                borderLeft: "4px solid #008a00",
                backgroundColor: "#e6f7e6",
                "& .callout-title": {
                  color: "#006100",
                },
              },
            },
          },
        },
      }}
    />
  );
};

export default MeaxoEditorStyles;
